const { createClient } = require('redis')
const fs = require('fs')
const path = require('path')

// Redis configuration from the API backup
const REDIS_URL = process.env.REDIS_URL || 'redis://default:DTBSTJ27DpCzsdbwJSR9kDvH7SZ8oAjG@redis-11863.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com:11863'

// Create Redis client
const client = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500)
  }
})

// Connect to Redis
client.on('error', (err) => console.error('Redis Client Error:', err))
client.on('connect', () => console.log('✅ Redis connected successfully'))

async function resetViewCounts() {
  try {
    // Connect to Redis
    if (!client.isOpen) {
      await client.connect()
    }

    // Read blog data
    const blogDataPath = path.join(__dirname, '../data/blog-index.json')
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'))
    
    console.log(`📊 Found ${blogData.length} blog posts to process`)
    console.log('🔄 Starting view count reset to 0...\n')

    const results = []

    for (const post of blogData) {
      const slug = post.slug
      const key = `viewCount:${slug}`
      
      try {
        // Get current count before reset
        const currentCount = await client.get(key)
        const previousViews = currentCount ? parseInt(currentCount, 10) : 0
        
        // Reset to 0
        await client.set(key, '0')
        
        // Set expiration to 30 days (same as API)
        await client.expire(key, 30 * 24 * 60 * 60)
        
        results.push({
          slug,
          title: post.title,
          previousCount: previousViews,
          newCount: 0,
          reset: previousViews
        })
        
        console.log(`🔄 ${slug}: ${previousViews} → 0 (reset ${previousViews} views)`)
        
      } catch (error) {
        console.error(`❌ Error resetting ${slug}:`, error.message)
        results.push({
          slug,
          title: post.title,
          error: error.message
        })
      }
    }

    // Summary
    console.log('\n🔄 RESET SUMMARY:')
    console.log('=' * 50)
    
    const successful = results.filter(r => !r.error)
    const failed = results.filter(r => r.error)
    const totalReset = successful.reduce((sum, r) => sum + r.reset, 0)
    
    console.log(`✅ Successfully reset: ${successful.length} posts`)
    console.log(`❌ Failed: ${failed.length} posts`)
    console.log(`🔄 Total views reset: ${totalReset.toLocaleString()}`)
    
    if (successful.length > 0) {
      console.log('\n📋 SUCCESSFUL RESETS:')
      successful.forEach(result => {
        console.log(`  • ${result.slug}: ${result.previousCount} → 0`)
      })
    }
    
    if (failed.length > 0) {
      console.log('\n❌ FAILED RESETS:')
      failed.forEach(result => {
        console.log(`  • ${result.slug}: ${result.error}`)
      })
    }

    // Save results to file
    const resultsPath = path.join(__dirname, '../data/view-count-reset-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalReset,
      results
    }, null, 2))
    
    console.log(`\n💾 Results saved to: ${resultsPath}`)
    
  } catch (error) {
    console.error('❌ Script failed:', error)
  } finally {
    // Close Redis connection
    if (client.isOpen) {
      await client.quit()
      console.log('🔌 Redis connection closed')
    }
  }
}

// Run the script
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2)
  const helpArg = args.includes('--help') || args.includes('-h')
  const confirmArg = args.includes('--confirm') || args.includes('-y')
  
  if (helpArg) {
    console.log('🔄 View Count Reset Script')
    console.log('=========================')
    console.log('Usage:')
    console.log('  npm run views:reset                    # Reset all to 0 (with confirmation)')
    console.log('  npm run views:reset -- --confirm       # Skip confirmation prompt')
    console.log('  npm run views:reset -- --help          # Show this help')
    console.log('')
    console.log('⚠️  WARNING: This will reset ALL view counts to 0!')
    console.log('   This action cannot be undone.')
    console.log('')
    console.log('Examples:')
    console.log('  npm run views:reset                    # Interactive confirmation')
    console.log('  npm run views:reset -- --confirm       # Force reset without prompt')
    process.exit(0)
  }
  
  console.log('🔄 View Count Reset Script')
  console.log('=========================')
  console.log(`Redis URL: ${REDIS_URL}`)
  console.log('⚠️  WARNING: This will reset ALL view counts to 0!')
  console.log('   This action cannot be undone.')
  console.log('')
  
  // Confirmation prompt (unless --confirm flag is used)
  if (!confirmArg) {
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    rl.question('Are you sure you want to reset all view counts to 0? (yes/no): ', (answer) => {
      rl.close()
      
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log('✅ Confirmed. Starting reset...\n')
        resetViewCounts()
          .then(() => {
            console.log('\n🎉 Reset completed successfully!')
            process.exit(0)
          })
          .catch((error) => {
            console.error('\n💥 Script failed:', error)
            process.exit(1)
          })
      } else {
        console.log('❌ Reset cancelled.')
        process.exit(0)
      }
    })
  } else {
    console.log('✅ Auto-confirmed. Starting reset...\n')
    resetViewCounts()
      .then(() => {
        console.log('\n🎉 Reset completed successfully!')
        process.exit(0)
      })
      .catch((error) => {
        console.error('\n💥 Script failed:', error)
        process.exit(1)
      })
  }
}

module.exports = { resetViewCounts }

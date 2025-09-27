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

async function inflateViewCounts(inflationAmount = 5000) {
  try {
    // Connect to Redis
    if (!client.isOpen) {
      await client.connect()
    }

    // Read blog data
    const blogDataPath = path.join(__dirname, '../data/blog-index.json')
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'))
    
    console.log(`📊 Found ${blogData.length} blog posts to process`)
    console.log(`🚀 Starting view count inflation (+${inflationAmount} views per post)...\n`)

    const results = []

    for (const post of blogData) {
      const slug = post.slug
      const key = `viewCount:${slug}`
      
      try {
        // Get current count
        const currentCount = await client.get(key)
        const currentViews = currentCount ? parseInt(currentCount, 10) : 0
        
        // Add 5000 views
        const newCount = currentViews + inflationAmount
        await client.set(key, newCount.toString())
        
        // Set expiration to 30 days (same as API)
        await client.expire(key, 30 * 24 * 60 * 60)
        
        results.push({
          slug,
          title: post.title,
          previousCount: currentViews,
          newCount: newCount,
          added: inflationAmount
        })
        
        console.log(`✅ ${slug}: ${currentViews} → ${newCount} (+${inflationAmount})`)
        
      } catch (error) {
        console.error(`❌ Error processing ${slug}:`, error.message)
        results.push({
          slug,
          title: post.title,
          error: error.message
        })
      }
    }

    // Summary
    console.log('\n📈 INFLATION SUMMARY:')
    console.log('=' * 50)
    
    const successful = results.filter(r => !r.error)
    const failed = results.filter(r => r.error)
    
    console.log(`✅ Successfully processed: ${successful.length} posts`)
    console.log(`❌ Failed: ${failed.length} posts`)
    console.log(`📊 Total views added: ${successful.length * inflationAmount}`)
    
    if (successful.length > 0) {
      console.log('\n📋 SUCCESSFUL INFLATIONS:')
      successful.forEach(result => {
        console.log(`  • ${result.slug}: ${result.previousCount} → ${result.newCount}`)
      })
    }
    
    if (failed.length > 0) {
      console.log('\n❌ FAILED INFLATIONS:')
      failed.forEach(result => {
        console.log(`  • ${result.slug}: ${result.error}`)
      })
    }

    // Save results to file
    const resultsPath = path.join(__dirname, '../data/view-count-inflation-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      inflationAmount,
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
  const amountArg = args.find(arg => arg.startsWith('--amount=') || arg.startsWith('-a='))
  const helpArg = args.includes('--help') || args.includes('-h')
  
  if (helpArg) {
    console.log('🎯 View Count Inflation Script')
    console.log('=============================')
    console.log('Usage:')
    console.log('  npm run views:inflate                    # Default: +5000 views')
    console.log('  npm run views:inflate -- --amount=10000  # Custom amount')
    console.log('  npm run views:inflate -- -a=2500         # Short form')
    console.log('  npm run views:inflate -- --help          # Show this help')
    console.log('')
    console.log('Examples:')
    console.log('  npm run views:inflate -- --amount=10000  # Add 10,000 views')
    console.log('  npm run views:inflate -- -a=1000         # Add 1,000 views')
    console.log('  npm run views:inflate -- --amount=0       # Check current counts only')
    process.exit(0)
  }
  
  // Extract amount from arguments
  let inflationAmount = 5000 // default
  if (amountArg) {
    const amount = parseInt(amountArg.split('=')[1], 10)
    if (isNaN(amount) || amount < 0) {
      console.error('❌ Invalid amount. Please provide a positive number.')
      console.log('Use --help for usage information.')
      process.exit(1)
    }
    inflationAmount = amount
  }
  
  console.log('🎯 View Count Inflation Script')
  console.log('=============================')
  console.log(`Redis URL: ${REDIS_URL}`)
  console.log(`Inflation Amount: ${inflationAmount} views per post`)
  console.log('')
  
  inflateViewCounts(inflationAmount)
    .then(() => {
      console.log('\n🎉 Script completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error)
      process.exit(1)
    })
}

module.exports = { inflateViewCounts }

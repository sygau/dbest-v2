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

async function checkViewCounts() {
  try {
    // Connect to Redis
    if (!client.isOpen) {
      await client.connect()
    }

    // Read blog data
    const blogDataPath = path.join(__dirname, '../data/blog-index.json')
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'))
    
    console.log(`📊 Checking view counts for ${blogData.length} blog posts`)
    console.log('🔍 Current view counts:\n')

    const results = []
    let totalViews = 0

    for (const post of blogData) {
      const slug = post.slug
      const key = `viewCount:${slug}`
      
      try {
        // Get current count
        const currentCount = await client.get(key)
        const views = currentCount ? parseInt(currentCount, 10) : 0
        
        results.push({
          slug,
          title: post.title,
          views,
          hasData: currentCount !== null
        })
        
        totalViews += views
        
        const status = currentCount ? '📈' : '❌'
        console.log(`${status} ${slug}: ${views} views`)
        
      } catch (error) {
        console.error(`❌ Error checking ${slug}:`, error.message)
        results.push({
          slug,
          title: post.title,
          views: 0,
          error: error.message
        })
      }
    }

    // Summary
    console.log('\n📈 VIEW COUNT SUMMARY:')
    console.log('=' * 50)
    console.log(`📊 Total posts: ${blogData.length}`)
    console.log(`📈 Posts with data: ${results.filter(r => r.hasData).length}`)
    console.log(`❌ Posts without data: ${results.filter(r => !r.hasData).length}`)
    console.log(`🔢 Total views: ${totalViews.toLocaleString()}`)
    console.log(`📊 Average views per post: ${Math.round(totalViews / blogData.length)}`)

    // Top posts
    const sortedResults = results
      .filter(r => !r.error)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    if (sortedResults.length > 0) {
      console.log('\n🏆 TOP 5 POSTS BY VIEWS:')
      sortedResults.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.slug}: ${result.views.toLocaleString()} views`)
      })
    }

    // Save results to file
    const resultsPath = path.join(__dirname, '../data/view-count-check-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalViews,
      averageViews: Math.round(totalViews / blogData.length),
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
  console.log('🔍 View Count Checker Script')
  console.log('============================')
  console.log(`Redis URL: ${REDIS_URL}`)
  console.log('')
  
  checkViewCounts()
    .then(() => {
      console.log('\n🎉 Check completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error)
      process.exit(1)
    })
}

module.exports = { checkViewCounts }

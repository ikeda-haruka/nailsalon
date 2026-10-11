// scripts/sync-task.js
const token = process.env.GITHUB_TOKEN;
const repo = 'ikeda-haruka/nailsalon';

async function main() {
  const [,, issueNum, status, commentText] = process.argv;
  if (!issueNum) {
    console.log('Usage: GITHUB_TOKEN=xxx node scripts/sync-task.js <issueNum> <status: open|close> [commentText]');
    process.exit(1);
  }

  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required.');
    process.exit(1);
  }

  const headers = {
    'Authorization': `token ${token}`,
    'User-Agent': 'NodeJS',
    'Content-Type': 'application/json'
  };

  if (commentText) {
    const commentRes = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNum}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: commentText })
    });
    const cData = await commentRes.json();
    console.log(`Commented on Issue #${issueNum}:`, cData.html_url);
  }

  if (status === 'close' || status === 'closed') {
    const closeRes = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNum}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ state: 'closed' })
    });
    const clData = await closeRes.json();
    console.log(`Closed Issue #${issueNum}:`, clData.state);
  } else if (status === 'open') {
    console.log(`Issue #${issueNum} kept open.`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

// scripts/list_gemini_models.js
if (!process.env.GEMINI_API_KEY) {
  console.error('Set GEMINI_API_KEY env var and run: GEMINI_API_KEY=xxx node scripts/list_gemini_models.js');
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
    });
    const data = await res.json();
    console.log('ListModels response (trimmed):');
    if (data.models && Array.isArray(data.models)) {
      data.models.slice(0, 20).forEach((m, i) => {
        console.log(i + 1, m.name, m.supportedMethods || '');
      });
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('ListModels call failed:', err);
  }
})();

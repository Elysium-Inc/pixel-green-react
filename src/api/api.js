const categories = ["PERFORMANCE", "SEO", "ACCESSIBILITY"];
const locales = ["fr", "en", "es"];

export const fetchFromApi = async (url) => {
  try {
    const req = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=${categories[0]}&locale=${locales[0]}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await req.json();
    return res.lighthouseResult;
  } catch (e) {
    throw new Error(e);
  }
};

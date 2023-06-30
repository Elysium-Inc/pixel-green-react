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
    console.log({ res, req });
    if (req.status === 200) return res.lighthouseResult;
    if (res.status !== 200) return res.error;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

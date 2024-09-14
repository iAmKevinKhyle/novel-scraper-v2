import puppeteer from "puppeteer";

const url = "https://novelbin.me/";

// GET THE HOTTEST NOVELS
export const GET_HOME_CONTENTS = async (req, res, next) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "load",
  });

  const hotNovelsHandles = await page.$$(".index-novel > .item");
  const latestNovelsHandles = await page.$$(
    "#novel-list-index .list.index-novel > .row"
  );
  const completedNovelsHandles = await page.$$(".list.list-thumb > .row a");

  const novels = {
    hotNovels: null,
    latestNovels: null,
    completedNovels: null,
  };
  const hotNovels = [];
  const latestNovels = [];
  const completedNovels = [];

  for (const hotNovelHandle of hotNovelsHandles) {
    let title = null;
    let link = null;
    let img = null;

    try {
      title = await page.evaluate(
        (el) => el.querySelector(".title > h3").textContent,
        hotNovelHandle
      );
    } catch (error) {}
    try {
      link = await page.evaluate(
        (el) => el.querySelector("div.item > a").getAttribute("href"),
        hotNovelHandle
      );
    } catch (error) {}
    try {
      img = await page.evaluate(
        (el) =>
          el.querySelector("div.item > a > .item-img").getAttribute("src"),
        hotNovelHandle
      );
    } catch (error) {}

    hotNovels.push({
      title,
      link,
      img,
    });
  }
  novels.hotNovels = hotNovels;

  for (const latestNovelHandle of latestNovelsHandles) {
    let title = null;
    let link = null;
    let genres = null;
    let latest_chapter = null;
    let latest_chapter_link = null;
    let update_time = null;

    try {
      title = await page.evaluate(
        (el) => el.querySelector(".col-title > h3").textContent,
        latestNovelHandle
      );
    } catch (error) {}
    try {
      link = await page.evaluate(
        (el) => el.querySelector(".col-title > h3 > a").getAttribute("href"),
        latestNovelHandle
      );
    } catch (error) {}
    try {
      genres = await page.evaluate(
        (el) => el.querySelector(".col-genre").textContent,
        latestNovelHandle
      );
    } catch (error) {}
    try {
      latest_chapter = await page.evaluate(
        (el) => el.querySelector(".col-chap.text-info > a").textContent,
        latestNovelHandle
      );
    } catch (error) {}
    try {
      latest_chapter_link = await page.evaluate(
        (el) =>
          el.querySelector(".col-chap.text-info > a").getAttribute("href"),
        latestNovelHandle
      );
    } catch (error) {}
    try {
      update_time = await page.evaluate(
        (el) => el.querySelector(".col-time").textContent,
        latestNovelHandle
      );
    } catch (error) {}

    latestNovels.push({
      title,
      link,
      genres,
      latest_chapter,
      latest_chapter_link,
      update_time,
    });
  }
  novels.latestNovels = latestNovels;

  for (const completedNovelsHandle of completedNovelsHandles) {
    let title = null;
    let link = null;
    let img = null;
    let count = null;

    try {
      title = await page.evaluate(
        (el) => el.querySelector("h3").textContent,
        completedNovelsHandle
      );
    } catch (error) {}
    try {
      link = await page.evaluate(
        (el) => el.getAttribute("href"),
        completedNovelsHandle
      );
    } catch (error) {}
    try {
      img = await page.evaluate(
        (el) => el.querySelector("img").getAttribute("data-src"),
        completedNovelsHandle
      );
    } catch (error) {}
    try {
      count = await page.evaluate(
        (el) => el.querySelector("small").textContent,
        completedNovelsHandle
      );
    } catch (error) {}

    completedNovels.push({
      title,
      link,
      img,
      count,
    });
  }
  novels.completedNovels = completedNovels;

  await browser.close();
  return res.status(200).json(novels);
};

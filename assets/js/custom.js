// const div = document.querySelector(".github-topic-projects");

async function getDataBatch(page) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:playwright-template&per_page=100&page=${page}`,
    { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
  );
  const data = await response.json();
  return data;
}

async function getData() {
  const data = [];
  let page = 1;
  let totalCount = 1;
  while (data.length < totalCount) {
    const dataBatchPromises = [];
    for (let i = 0; i < 5; i++) {
      if (data.length >= totalCount) break;
      dataBatchPromises.push(getDataBatch(page++));
    }
    const dataBatches = await Promise.all(dataBatchPromises);
    dataBatches.forEach((dataBatch) => {
      data.push(...dataBatch.items);
      totalCount = dataBatch.total_count;
    });
  }
  return data;
}

function setupTermynal() {
  const termynalActivateClass = "termy";
  const termynals = [];

  function createTermynals() {
    const highlightNodes = document.querySelectorAll(
      `.${termynalActivateClass} .highlight`
    );
    highlightNodes.forEach((node) => {
      const text = node.textContent;
      const lines = text.split("\n");
      const useLines = [];
      let buffer = [];

      function saveBuffer() {
        if (buffer.length) {
          let isBlankSpace = true;
          buffer.forEach((line) => {
            if (line) {
              isBlankSpace = false;
            }
          });

          if (isBlankSpace) {
            useLines.push({ delay: 0 });
          }

          if (buffer[buffer.length - 1] === "") {
            buffer.push("");
          }

          const bufferValue = buffer.join("<br>");
          useLines.push({ value: bufferValue });
          buffer = [];
        }
      }

      for (let line of lines) {
        if (line === "---> 100%") {
          saveBuffer();
          useLines.push({ type: "progress" });
        } else if (line.startsWith("$ ")) {
          saveBuffer();
          const value = line.replace("$ ", "").trimEnd();
          useLines.push({ type: "input", value });
        } else if (line.startsWith("// ")) {
          saveBuffer();
          const value = "💬 " + line.replace("// ", "").trimEnd();
          useLines.push({ value, class: "termynal-comment", delay: 0 });
        } else if (line.startsWith("# ")) {
          saveBuffer();
          const promptStart = line.indexOf("$ ");
          if (promptStart === -1) {
            console.error("Custom prompt found but no end delimiter", line);
          }
          const prompt = line.replace("# ", "").slice(0, promptStart);
          const value = line.slice(promptStart + 2);
          useLines.push({ type: "input", value, prompt });
        } else {
          buffer.push(line);
        }
      }

      saveBuffer();
      const div = document.createElement("div");
      node.replaceWith(div);
      const termynal = new Termynal(div, {
        lineData: useLines,
        noInit: true,
        lineDelay: 500,
      });
      termynals.push(termynal);
    });
  }

  function loadVisibleTermynals() {
    termynals.forEach((termynal, index) => {
      if (termynal.container.getBoundingClientRect().top - innerHeight <= 0) {
        if (!termynal.initialized) {
          termynal.init();
          termynal.initialized = true;
        }
      } else {
        termynals.splice(index, 1);
      }
    });
  }

  function handleScroll() {
    if (!throttledScroll) {
      throttledScroll = true;
      window.requestAnimationFrame(() => {
        loadVisibleTermynals();
        throttledScroll = false;
      });
    }
  }

  let throttledScroll = false;
  window.addEventListener("scroll", handleScroll);

  createTermynals();
  loadVisibleTermynals();
}

async function main() {
  if (div) {
    data = await getData();
    div.innerHTML = "<ul></ul>";
    const ul = document.querySelector(".github-topic-projects ul");
    data.forEach((v) => {
      if (v.full_name === "nhiendohao/playwright-template") {
        return;
      }
      const li = document.createElement("li");
      li.innerHTML = `<a href="${v.html_url}" target="_blank">★ ${v.stargazers_count} - ${v.full_name}</a> by <a href="${v.owner.html_url}" target="_blank">@${v.owner.login}</a>`;
      ul.append(li);
    });
  }

  setupTermynal();
}

!(function () {
  var analytics = (window.analytics = window.analytics || []);
  if (!analytics.initialize)
    if (analytics.invoked)
      window.console &&
        console.error &&
        console.error("Segment snippet included twice.");
    else {
      analytics.invoked = !0;
      analytics.methods = [
        "trackSubmit",
        "trackClick",
        "trackLink",
        "trackForm",
        "pageview",
        "identify",
        "reset",
        "group",
        "track",
        "ready",
        "alias",
        "debug",
        "page",
        "once",
        "off",
        "on",
        "addSourceMiddleware",
        "addIntegrationMiddleware",
        "setAnonymousId",
        "addDestinationMiddleware",
      ];
      analytics.factory = function (e) {
        return function () {
          var t = Array.prototype.slice.call(arguments);
          t.unshift(e);
          analytics.push(t);
          return analytics;
        };
      };
      for (var e = 0; e < analytics.methods.length; e++) {
        var key = analytics.methods[e];
        analytics[key] = analytics.factory(key);
      }
      analytics.load = function (key, e) {
        var t = document.createElement("script");
        t.type = "text/javascript";
        t.async = !0;
        t.src =
          "https://cdn.segment.com/analytics.js/v1/" +
          key +
          "/analytics.min.js";
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(t, n);
        analytics._loadOptions = e;
      };
      analytics._writeKey = "abc";
      analytics.SNIPPET_VERSION = "4.15.3";
      analytics.load("abc");
      analytics.page();
    }
})();

document.querySelectorAll("a.md-nav__link").forEach((link) => {
  if (link.href.includes("#")) {
    link.addEventListener("click", (e) => {
      // Retrieve href and store in targetUrl variable
      let targetUrl = e.target.href;
      analytics.track("Link Clicked", { link: targetUrl });
    });
  }
});

main();

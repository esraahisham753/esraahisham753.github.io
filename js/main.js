const fetchArticles = async () => {
  try {
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@esraahisham753",
    );
    const data = await response.json();

    // Check if the response is successful
    if (data.status === "ok") {
      // Extract post data from the response
      const items = data.items;
      return items;
    } else {
      console.error("Error fetching Medium posts:", data.message);
      return []; // or handle the error in another way
    }
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return []; // or handle the error in another way
  }
};

const extractTag = (tagName, htmlString) => {
  // Create a regular expression to match the opening and closing tags
  var regex = new RegExp("<" + tagName + ">(.*?)</" + tagName + ">", "g");

  // Execute the regular expression on the HTML string
  var matches = htmlString.match(regex);

  // If matches are found, you can use them as needed
  if (matches) {
    return matches; // This will print an array of matches
  }
};

const extractSelfClosedTags = (tagName, htmlString) => {
  // Define the self-closed tag you want to extract (e.g., 'img')
  var tagName = "img";

  // Create a regular expression to match the self-closed tag
  var regex = new RegExp("<" + tagName + ".*?>", "g");

  // Execute the regular expression on the HTML string
  var matches = htmlString.match(regex);

  // If matches are found, you can use them as needed
  if (matches) {
    return matches; // This will print an array of matches
  }
};

let blog = [];
const mainArticle = document.getElementById("main-article");

const renderArticle = (articleId) => {
  const article = document.getElementById(articleId);
  const blogIndex = parseInt(articleId[articleId.length - 1]);
  const images = extractSelfClosedTags("img", blog[blogIndex].content);
  const paragraphs = extractTag("p", blog[blogIndex].content);
  const blogThumbinal = article.querySelector(".blog__thumbinal");
  const blogHeading = article.querySelector(".blog__heading");
  const blogExcerpt = article.querySelector(".blog__excerpt");
  blogThumbinal.innerHTML = images[0];
  let articleLink = document.createElement("a");
  articleLink.href = blog[blogIndex].link;
  articleLink.target = "_blank";
  articleLink.textContent = blog[blogIndex].title;
  blogHeading.appendChild(articleLink);
  blogExcerpt.innerHTML = paragraphs[0];
};

const limitExcerpt = () => {
  const blogPosts = document.querySelectorAll(".blog__post");
  blogPosts.forEach((blogPost) => {
    const paragraph = blogPost.querySelector(".blog__excerpt p");
    console.log(paragraph.textContent.slice(0, 50) + "...");
    paragraph.textContent = paragraph.textContent.slice(0, 100) + "...";
  });
};

fetchArticles().then((response) => {
  //console.log(response);
  blog = response;
  // Main article

  console.log(blog[0].content);
  const images = extractSelfClosedTags("img", blog[0].content);
  console.log(images);
  const paragraphs = extractTag("p", blog[0].content);
  console.log(paragraphs);
  const blogThumbinal = mainArticle.querySelector(".blog__thumbinal");
  const blogHeading = mainArticle.querySelector(".blog__heading");
  const blogExcerpt = mainArticle.querySelector(".blog__excerpt");
  blogThumbinal.innerHTML = images[0];
  let articleLink = document.createElement("a");
  articleLink.href = blog[0].link;
  articleLink.target = "_blank";
  articleLink.textContent = blog[0].title;
  blogHeading.appendChild(articleLink);
  blogExcerpt.innerHTML = paragraphs[0] + paragraphs[1] + paragraphs[2];
  // Side articles
  renderArticle("article1");
  renderArticle("article2");
  renderArticle("article3");
  renderArticle("article4");
  renderArticle("article5");
  renderArticle("article6");
  limitExcerpt();
});

// Handle form data
// Assuming you have a form with id "emailForm"
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Gather form data
  const formData = new FormData(form);
  const email = formData.get("email");
  const message = formData.get("message");

  // Send data to backend
  fetch("https://{sandbox-id}.sse.codesandbox.io/" + "send-email", {
    method: "POST",
    body: JSON.stringify({ email, message }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
});

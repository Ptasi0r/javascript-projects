const postsContainer = document.querySelector('.post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('.filter');

let limit = 5;
let page = 1;

//Fetch posts from API
const getPosts = async () => {
  const respondPost = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const dataPost = await respondPost.json();

  //Get image ()
  const respondImg = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  const dataImg = await respondImg.json();

  const data = dataPost.map((post, index) => {
    const obj = {
      ...post,
      download_url: dataImg[index]['download_url'],
    };
    return obj;
  });
  return data;
};

// Show posts in DOM
const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="img-container">
        <img src="https://picsum.photos/seed/${post.id}/600/600/" alt="" />
      </div>

      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        <span class="number">
          ${post.id < 10 ? `0${post.id}` : post.id}
        </span>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

// Show loader and fetch more posts

const showLoading = () => {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

//Filter posts by input
const filterPost = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  console.log('ee');
  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      if (document.documentElement.clientWidth < 1000) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'grid';
      }
    } else {
      post.style.display = 'none';
    }
  });
};

//Show inital posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', (e) => {
  filterPost(e);
});

const $ = (selector) => document.querySelector(selector);

const search_page = $('#search-form');
const input = $('#search-input');

search_page.addEventListener('submit', (e) => {
    e.preventDefault();
    const search_term = input.value;

    //Get the param "limit" from the url
    const url = new URL(window.location.href);
    let limit = url.searchParams.get('limit');
    limit = Number(limit) || 10;
    window.location.href = `/?page=${search_term}&limit=${limit}`;
})
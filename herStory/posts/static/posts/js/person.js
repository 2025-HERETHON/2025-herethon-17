// person.js

const personList = document.getElementById("personList");
const pagination = document.getElementById("pagination");
const itemsPerPage = 7; // 페이지당 인물 수

// API에서 인물 데이터 받아오기
async function fetchData(page = 1) {
  try {
    const response = await fetch(`/api/persons?page=${page}`);
    const data = await response.json();
    renderCards(data.items);
    renderPagination(data.totalPages, page);
  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
  }
}

// 인물 카드 렌더링
function renderCards(items) {
  personList.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("card-row");
    row.onclick = () => {
      location.href = `/person/${item.id}`;
    };

    const scroll = document.createElement("div");
    scroll.classList.add("card-scroll");

    scroll.innerHTML = `
      <span class="label">이름</span><span class="value">${item.name}</span>
      <span class="label">시대</span><span class="value">${item.era}</span>
      <span class="label">지역</span><span class="value">${item.region}</span>
    `;

    row.appendChild(scroll);
    personList.appendChild(row);
  });
}

// 페이지네이션 렌더링
function renderPagination(totalPages, currentPage) {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.classList.add("page-btn");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      fetchData(i);
    });

    pagination.appendChild(btn);
  }
}

// 첫 페이지 데이터 로드
fetchData(1);

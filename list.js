//http://localhost:5500/contcats?pageno=값
function getPageno(){
    //get 방식의 querystring을 읽을 수 있는 객체를 생성
    const param = new URLSearchParams(location.search);
    const pageno = parseInt(param.get('pageno'));
    //pageno가 없거나 숫자로 바뀔 수 없는 값인 경우 parseInt의 결과는 NaN
    // Not a Number
    //NaN는 비교가 안됨 무조건 js에선 false
    //NaN와 비교할땐 isNaN() 함수 사용
    if(isNaN(pageno))
        return 1;
    else if(pageno<1)
        return 1;
    return pageno;
}
//기본 매개변수 default parameter
async function fetch(pageno=1, pagesize=10){
    const api = 'http://sample.bmaster.kro.kr/contacts';
    const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
    //$.ajax는 병렬처리(비동기처리)코드->언제끝날지모른다
    //비동기코드를 리턴받는 result는 미래에 값이 들어올것이다 라는 값을 가짐
    //Promise
    try{
        return await $.ajax(url);
    }catch(err){
        console.log(err);
        return null;
    }
}

function printContacts(contacts) {
    const $parent = $('#tbody');
    for(c of contacts) {
      const html = `
        <tr>
          <td>${c.no}</td>
          <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
          <td>${c.tel}</td>
          <td>${c.address}</td>
        </tr>
      `;
      $parent.append(html);
    }
  }

  //pagination에 필요한 prev start end next pegeno를 리턴하는 함수
  //getPagination(result)-> result에서 pageno pagesize totalcount를 꺼내는문법
  //->구조분해할당
  function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
    //페이지 갯수계산
    const countOfPage = Math.ceil(totalcount/pagesize);
    //p s e n 계산 후 목록의 끝에 도달하면 e n를 변경
    const prev = Math.floor((pageno-1)/blockSize)*blockSize;
    const start = prev+1;
    let end = prev + blockSize;
    let next = end + 1;
    if(end>=countOfPage) {
      end = countOfPage;
      next = 0;
    }
    //객체를 변수로 분해 변수를 모아서 객체를 생성
    //->구조분해할당
    //return {prev:prev, start:start, end:end, next:next}과 같음
    return {prev, start, end, next, pageno};
  }

  function printPagination({prev, start, end, next}, pageno) {
    const $parent = $('#pagination')
    if(prev>0) {
      const html =`
        <li class='page-item'>
          <a class='page-link' href='list.html?pageno=${prev}'>이전으로</a>
        </li>`;
      $parent.append(html);
    }
    for(let i=start; i<=end; i++) {
      const className = pageno===i? 'page-item active' : 'page-item';
      const html =`
        <li class='${className}'>
          <a class='page-link' href='list.html?pageno=${i}'>${i}</a>
        </li>`;
      $parent.append(html);  
    }
    if(next>0) {
      const html =`
        <li class='page-item'>
          <a class='page-link' href='list.html?pageno=${next}'>다음으로</a>
        </li>`;
      $parent.append(html);
    }
  }
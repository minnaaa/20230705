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
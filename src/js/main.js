const $siteList = $('.siteList')
const $last = $('.last')
// 获取到当前的localStorage,然后转换成对象
let x = localStorage.getItem('x')
let xObject = JSON.parse(x);
// 动态创建数组，然后通过动态添加和删除。 判断localStorage有没有存在数据,有的话则用,没有就用默认的
const hashMap = xObject ||  [
  {logo: 'A', url: 'https://www.acfun.cn'},
  {logo: 'B', url: 'https://www.bilibibli.com'}
]
const simplifyUrl = (url) => {
  let newUrl = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
  return newUrl
}
const render = () => {
  // 找到除了最后一个的li然后每个都移除掉
    $siteList.find('li:not(.last)').remove()
  // 遍历数组，将每一项插入到新增网站之前
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <a href="${node.url}" target="_blank">
      <div class="site">
        <div class="logo">
          ${simplifyUrl(node.url)[0].toUpperCase()}
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
      </div>
    </a>
  </li>
    `).insertBefore($last)
    $li.on('click', '.close', e => {
      e.preventDefault();
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()
// 添加点击事件
$('.addButton').on('click', () => {
  let url = prompt('请问你要添加的网址');
  // 判断http是不是开头 若不是则自动添加
  if(url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  // 将新添加的url加入到hashMap数组中
  hashMap.push({logo: url[8], url: url});

  // 再生成新的样式
  render()
})

window.onbeforeunload = () => {
  let string = JSON.stringify(hashMap);
  localStorage.setItem('x', string)
}
$(document).on('keypress', e => {
  const { key } = e;
  for(let i=0;i< hashMap.length;i++) {
    if(hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})
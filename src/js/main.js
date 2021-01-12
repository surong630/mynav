const $siteList = $('.siteList')
const $last = $('.last')
// 获取到当前的localStorage,然后转换成对象
let x = localStorage.getItem('x')
let xObject = JSON.parse(x);
// 动态创建数组，然后通过动态添加和删除。 判断localStorage有没有存在数据,有的话则用,没有就用默认的
const hashMap = xObject ||  [
  {logo: 'A', logoType: 'text', url: 'https://www.acfun.cn'},
  {logo: './images/blibli.png', logoType: 'image', url: 'https://www.bilibibli.com'}
]
const render = () => {
// 遍历数组，将每一项插入到新增网站之前
  hashMap.forEach(node => {
    const $li = $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo">
          ${node.logo[0]}
        </div>
        <div class="link">${node.url}</div>
      </div>
    </a>
  </li>
    `).insertBefore($last)
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
  hashMap.push({logo: url, logoType: 'text', url: url});
  // 找到除了最后一个的li然后每个都移除掉
  $siteList.find('li:not(.last)').remove()
  // 再生成新的样式
  render()
})
window.onbeforeunload = () => {
  let string = JSON.stringify(hashMap);
  localStorage.setItem('x', string)
}
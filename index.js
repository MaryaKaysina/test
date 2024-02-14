const createTree = array => array
  .reduce ((a, c) => {
    c.children = array
      .filter(i => i.head == c.id)
      .sort((a, b) => a.sorthead - b.sorthead)
    a.push(c)
    return a
  }, [])
  .filter (i => i.head == null)
  .sort((a, b) => a.sorthead - b.sorthead);

const treeToHtml = (nodes, depth = 0) => {
  if (!nodes) return '';
  const ul = document.createElement('ul');
  for (const node of nodes) {
    const li = document.createElement('li');
    li.textContent = `${node.name} (${node.price})`;
    if (node?.children.length) {
      li.append(treeToHtml(node.children, depth + 1));
      li.classList.add('list');
    }
    ul.append(li);
  }
  return ul;
}

const toggleList = (event) => {
  if (event.eventPhase === 2) {
    event.target.classList.toggle('active');
    if (!event.target.classList.contains('active')) {
      const childLists = event.target.querySelectorAll('.list');
      childLists.forEach(el => el.classList.remove('active'))
    }
  }
}

const root = document.getElementById('root');
root.append(treeToHtml(createTree(servicesData.services)));

const lists = document.querySelectorAll('.list');
lists.forEach(list => {
  list.addEventListener('click', (e) => toggleList(e))
})
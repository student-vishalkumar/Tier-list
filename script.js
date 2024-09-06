let currentDraggedItem;
const tierInput = document.getElementById('tier');
const submitBtn = document.getElementById('submit');
// const imageInput = document.getElementById('image-item')
const imageForm = document.getElementById('image-form')
const itemContainers = document.getElementsByClassName('item-container')

for (const itemContainer of itemContainers) {
    setUpItemContainerForDrag(itemContainer)
}

submitBtn.addEventListener('click' ,(e) => {
    e.preventDefault();
    if(tierInput.value === '') {
        alert("Please enter a valid tierlist name ")
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = '';
})

imageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const imageItemInput = document.getElementById('image-item')
    if(imageItemInput.value === '') {
        alert("enter a valid url")
        return
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = ''
})

function createTierList(tierListName) {
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading = document.createElement('div')
    heading.classList.add('heading');

    const textContainer = document.createElement('div');
    textContainer.textContent = tierListName;

    heading.appendChild(textContainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items')

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems)

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList)

}

function createTierListItem(imageUrl) {
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', true);
    imageDiv.classList.add('item-container');

    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src = imageUrl;
    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart', (e) => {
        currentDraggedItem = e.target.parentNode;
    })

    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    });

}

function setUpDropZoneInTierListItem(tierListItem) {
    tierListItem.addEventListener('drop', (e) => {
        e.preventDefault();
    });

    tierListItem.addEventListener('dragover', function (e) {
        if(this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }
    });
}
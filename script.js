'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ブラウザのbodyタグ内の幅を取得
const winWidth = window.parent.innerWidth;
const winHeight = window.parent.innerHeight

//main-containerのサイズを定義
const mainContainer = document.getElementById("main-container");
mainContainer.style.width = `${winWidth}px`;
mainContainer.style.height = winHeight;
document.getElementById("contents-section").style.width = `${winWidth - 300}px`;



//menuのクリックされたliタグのid名を取得し、変数clickedMenuIdに格納
let clickedMenuId
const menuArray = document.getElementsByClassName("menu");
for (let i = 0; i < menuArray.length; i++) {
    menuArray[i].addEventListener("click", () => {
        clickedMenuId = menuArray[i].id;
        //クリックされたliタグのid名と同じ名前を持つclassに対しての処理
        const selectClassArray = document.querySelectorAll("." + clickedMenuId);
        for (const element of selectClassArray) {
            element.style.visibility = "visible";
        }
        let parentIdName = "#parent" + clickedMenuId.substring(8);
        document.querySelector(parentIdName).style.width
            = `${winWidth - 300}px`;

        //クリックされていないliタグのid名を配列に格納
        const noClickedMenuArrayId = [];
        for (let i = 0; i < menuArray.length; i++) {
            if (menuArray[i].id !== clickedMenuId) {
                noClickedMenuArrayId.push(menuArray[i].id);
            }
        }
        //クリックされていないliタグのid名と同じ名前を持つclassに対しての処理
        for (const elementId of noClickedMenuArrayId) {
            const selectClassArray = document.querySelectorAll("." + elementId);
            for (const element of selectClassArray) {
                element.style.visibility = "hidden";
            }
            let parentIdName = "#parent" + elementId.substring(8);
            document.querySelector(parentIdName).style.width = `${0}px`;
        }
    }
    )
}

//もう一つリストを追加ボタンを押す
//カードのdivを作成or取得
//タイトルのh2要素を作成or取得
//タイトルの編集ボックスを作成or取得
//カード内のコンテナdivを作成or取得
//カード内の詳細ボックスを作成or取得
//カード内の詳細


//divタグcontentsC内のカードとイベントを複製
const childContainer = document.getElementById("childContainer");
const addCardBtn = document.getElementById("card_add");
addCardBtn.addEventListener("click",
    () => {
        const card = document.getElementsByClassName("card");
        const cloneCard = card[card.length - 1].cloneNode(true);
        childContainer.appendChild(cloneCard);
        const lastIndex = card.length - 1;
        childContainer.appendChild(addCardBtn);
        editCardDetails(card[lastIndex]);
        editTitleVisible(lastIndex);
        editTitleVisibleOff(lastIndex);
        addDetail(lastIndex);
    }
)




//contentsC カード内のタイトルを編集する
function editTitleVisible(i) {
    const classCardTitleArray = document.getElementsByClassName("card_title");
    classCardTitleArray[i].addEventListener("click",
        () => {
            const title = document.getElementsByClassName("card_titleInput");
            title[i].style.visibility = "visible";
            classCardTitleArray[i].style.visibility = "hidden";
        }
    )
}
editTitleVisible(0);

//contentsC カード内のタイトル編集をオフにする
function editTitleVisibleOff(i) {
    const editTitleBoxArray = document.getElementsByClassName("card_titleInput");
    editTitleBoxArray[i].addEventListener("keydown",
        (e) => {
            if (e.key === "Enter") {
                const classCardTitleArray = document.getElementsByClassName("card_title");
                classCardTitleArray[i].innerHTML = 
                `<h2 class = "card_title">${editTitleBoxArray[i].value}</h2>`;
                editTitleBoxArray[i].style.visibility = "hidden";
                classCardTitleArray[i].style.visibility = "visible";
            }
        }
    )

}
editTitleVisibleOff(0);

// カード内の要素を編集
function editCardDetails(card) {
    const detailBoxArray = card.getElementsByClassName("cardDetailsBox");
    for (let i = 0; i <= detailBoxArray.length - 1; i++) {
        detailBoxArray[i].addEventListener("click",
            () => {
                console.log(detailBoxArray[0] + "??" + detailBoxArray[i]);
            }
        )
    }
}
editCardDetails(document.getElementsByClassName("card")[0]);


//カード内の要素を作成
function addDetail(index) {
    const addDetailsBoxArray = document.getElementsByClassName("addDetailsBox");
    addDetailsBoxArray[index].addEventListener("click",
        () => {
            const detailsContainer = document.getElementsByClassName("card_detailContainer")[index];
            const detailbox = detailsContainer.getElementsByClassName("cardDetailsBox")[0];
            const details = detailbox.getElementsByClassName("cardDetails")[0];
            const cloneDetailBox = detailbox.cloneNode(false);
            const cloneDetail = details.cloneNode(false);
            cloneDetail.innerHTML = `<h4 class = "cardDetails"></h4>`;
            cloneDetailBox.appendChild(cloneDetail);
            detailsContainer.appendChild(cloneDetailBox);
            detailsContainer.appendChild(addDetailsBoxArray[index]);
        }
    )

}
addDetail(0);





//職場紹介のコンテナを表示
function visibleWorkPlace() {
    const contentsWorkPlace = document.querySelector("#childA_1");
    const contentsA = document.querySelector("#childA");
    contentsA.style.visibility = "hidden";
    contentsWorkPlace.style.visibility = "visible"
}
const WorkPlace = document.querySelector("#workplace");
WorkPlace.addEventListener("click", visibleWorkPlace);

//職場紹介のコンテナを非表示
function invisibleWorkPlace() {
    const contentsWorkPlace = document.querySelector("#childA_1");
    const contentsA = document.querySelector("#childA");
    contentsA.style.visibility = "visible";
    contentsWorkPlace.style.visibility = "hidden";
}
const re = document.querySelector("#return");
re.addEventListener("click", invisibleWorkPlace);





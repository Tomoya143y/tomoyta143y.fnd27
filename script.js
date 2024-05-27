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

//1枚目のカードのオブジェクトを取得
const firstCard = document.getElementsByClassName("card")[0];
const firstCardTitle = document.getElementsByClassName("card_title")[0];
const firstCardTitleEdit = document.getElementsByClassName("card_titleInput")[0];
const firstAddDetailsBox = document.getElementsByClassName("addDetailsBox")[0];
const firstCard_detailContainer = document.getElementsByClassName("card_detailContainer")[0];
const firstCardDetailsBox = document.getElementsByClassName("card_detailsBox")[0];
const firstCardDetails = document.getElementsByClassName("card_details")[0];
const firstEditDetails = document.getElementsByClassName("edit_detail")[0];


//カード内のタイトルを編集するイベントリスナー
const editTitleVisible = (cardTitleElm, editTitleElm) => {
    cardTitleElm.addEventListener("click",
        () => {
            editTitleElm.style.visibility = "visible";
            cardTitleElm.style.visibility = "hidden";
        }
    )
}

//カード内のタイトル編集をオフにするイベントリスナー
const editTitleVisibleOff = (cardTitleElm, editTitleElm) => {
    editTitleElm.addEventListener("keydown",
        (e) => {
            if (e.key === "Enter") {
                cardTitleElm.innerText = editTitleElm.value;
                editTitleElm.style.visibility = "hidden";
                cardTitleElm.style.visibility = "visible";
            }
        }
    )
}

//カード内の詳細を編集するイベントリスナー
const editDetailOn = (detailElm, editDetailElm) => {
    detailElm.addEventListener("click",
        () => {
            editDetailElm.style.visibility = "visible";
            detailElm.style.visibility = "hidden";
        }
    )
}

//カード内の詳細編集をオフにするイベントリスナー
const editDetailOff = (detailElm, editDetailElm) => {
    editDetailElm.addEventListener("keydown",
        (e) => {
            if (e.key === "Enter") {
                detailElm.innerText = editDetailElm.value;
                editDetailElm.style.visibility = "hidden";
                detailElm.style.visibility = "visible";
            }
        }
    )
}


//要素を作成しクラス名をつける関数
const createElement = (element, className) => {
    const paragraph = document.createElement(element);
    paragraph.className = className;
    return paragraph
}

//カード内の要素を作成する関数
const addDetail = (addDetailsBox, card_detailContainer, card,cardHeight) => {
    let clickCounter = 0;
    addDetailsBox.addEventListener("click",
        () => {
            clickCounter = clickCounter + 1;
            const NewCard_detailsBox = createElement("div", "card_detailsBox");
            const NewCard_Details = createElement("h4", "card_details");
            const NewCard_EditDetail = createElement("input", "edit_detail");
            card_detailContainer.appendChild(NewCard_detailsBox);
            NewCard_detailsBox.appendChild(NewCard_Details);
            NewCard_detailsBox.appendChild(NewCard_EditDetail);
            card_detailContainer.appendChild(addDetailsBox);
            card.style.height = `${cardHeight + (40 * clickCounter)}px`;
            editDetailOn(NewCard_Details, NewCard_EditDetail);
            editDetailOff(NewCard_Details, NewCard_EditDetail);
        }
    )

}


//1枚目のカード内のオブジェクトにイベントリスナーを追加
editTitleVisible(firstCardTitle, firstCardTitleEdit);
editTitleVisibleOff(firstCardTitle, firstCardTitleEdit);
addDetail(firstAddDetailsBox, firstCard_detailContainer, firstCard,150);
editDetailOn(firstCardDetails, firstEditDetails);
editDetailOff(firstCardDetails, firstEditDetails);

//カードを配置するchildContainerの要素を取得
const childContainer = document.getElementById("childContainer");
const addCardBtn = document.getElementById("card_add");


//+カードを生成する関数
const addCard = (memo,title) => {
    //カードの外枠とタイトル、中枠を作成
    const card = createElement("div", "card");
    const card_title = createElement("h2", "card_title");
    const card_titleInput = createElement("input", "card_titleInput");
    card_titleInput.value = "input_title";
    const card_detailContainer = createElement("div", "card_detailContainer");
    //DBのタイトルが引数にあればタイトルに表示
    if(typeof(title) === "string"){
        card_title.innerText = `${title}`;
    }else {card_title.innerText = "Title"};
    //作成したタイトルにイベントリスナを設定
    editTitleVisible(card_title, card_titleInput);
    editTitleVisibleOff(card_title, card_titleInput);
    //作成した外枠とタイトル中枠を追加    
    childContainer.appendChild(card);
    card.appendChild(card_title);
    card.appendChild(card_titleInput);
    card.appendChild(card_detailContainer);
    //カードの高さを初期化
    let cardHeight =0;
    if (typeof (memo.length) === "number") {
        for (let i = 0; i <= memo.length-1; i++) {
            //子要素を作成
            const card_detailsBox = createElement("div", "card_detailsBox");
            const card_Details = createElement("h4", "card_details");
            const edit_detail = createElement("input", "edit_detail");
            //DBのmemoの要素を表示
            card_Details.innerText = `${memo[i]}`
            //子要素にイベントリスナを設定    
            editDetailOn(card_Details, edit_detail);
            editDetailOff(card_Details, edit_detail);
            //子要素を中枠に追加
            card_detailContainer.appendChild(card_detailsBox);
            card_detailsBox.appendChild(card_Details);
            card_detailsBox.appendChild(edit_detail);
            cardHeight = (i*40);
        }
    } else {
        //子要素を作成
        const card_detailsBox = createElement("div", "card_detailsBox");
        const card_Details = createElement("h4", "card_details");
        const edit_detail = createElement("input", "edit_detail");
        //子要素にイベントリスナを設定    
        editDetailOn(card_Details, edit_detail);
        editDetailOff(card_Details, edit_detail);
        //子要素を中枠に追加
        card_detailContainer.appendChild(card_detailsBox);
        card_detailsBox.appendChild(card_Details);
        card_detailsBox.appendChild(edit_detail);
       
    }
    cardHeight = 150+cardHeight;
    card.style.height = `${cardHeight}px`;
    //子要素の追加ボタンを作成
    const addDetailsBox = createElement("div", "addDetailsBox");
    const addDetails = createElement("h4", "addDetails");
    //追加ボタンのイベントリスナを設定
    addDetail(addDetailsBox, card_detailContainer, card,cardHeight);
    addDetails.innerText = "+カードの追加";
    //追加ボタンを中枠最後に追加    
    card_detailContainer.appendChild(addDetailsBox);
    addDetailsBox.appendChild(addDetails);
    //カードの追加ボタンを最後へ移動
    childContainer.appendChild(addCardBtn);
}


//+カードの追加を押すと要素を生成    
addCardBtn.addEventListener("click", addCard);
const DB =
    [
        {
            title: "自己紹介",
            memo: ["名前 山口智也", "出身地 愛知県豊田市", "住所 名古屋市昭和区",
                "家族 妻と保護猫2引", "職場 上郷エンジン鋳造部"]
        },
        {
            title: "仕事内容",
            memo: ["職場のDX関連の困りごと改善", "出来ること PowerPlatform全般"]
        }
    ]

const DBswitch = document.getElementsByClassName("DB")[0];
DBswitch.addEventListener("click",
    () => {
        for (let i = 0; i <= DB.length - 1; i++) {
            addCard(DB[i].memo,DB[i].title);
        }
        firstCard.style.visibility = "hidden";
        firstCard.style.width = `${0}px`;
    }
   
)


// //職場紹介のコンテナを表示
// function visibleWorkPlace() {
//     const contentsWorkPlace = document.querySelector("#childA_1");
//     const contentsA = document.querySelector("#childA");
//     contentsA.style.visibility = "hidden";
//     contentsWorkPlace.style.visibility = "visible"
// }
// const WorkPlace = document.querySelector("#workplace");
// WorkPlace.addEventListener("click", visibleWorkPlace);

// //職場紹介のコンテナを非表示
// function invisibleWorkPlace() {
//     const contentsWorkPlace = document.querySelector("#childA_1");
//     const contentsA = document.querySelector("#childA");
//     contentsA.style.visibility = "visible";
//     contentsWorkPlace.style.visibility = "hidden";
// }
// const re = document.querySelector("#return");
// re.addEventListener("click", invisibleWorkPlace);






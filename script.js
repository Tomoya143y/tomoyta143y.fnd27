'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ブラウザのbodyタグ内の幅を取得
const winWidth = window.parent.innerWidth;
const winHeight = window.parent.innerHeight

//main-containerのサイズを定義
const mainContainer = document.getElementById("main-container");
const mainBord = document.getElementById("mainBord");
mainContainer.style.width = `${winWidth}px`;
mainContainer.style.height = winHeight;
document.getElementById("childContainer").style.width = `${winWidth - 300}px`;

//1枚目のカードのオブジェクトを取得
const firstCard = document.getElementsByClassName("card")[0];
const firstCardTitle = document.getElementsByClassName("card_title")[0];
const firstCardTitleEdit = document.getElementsByClassName("card_titleInput")[0];
const firstAddDetailsBox = document.getElementsByClassName("addDetailsBox")[0];
const firstCard_detailContainer = document.getElementsByClassName("card_detailContainer")[0];
const firstCardDetailsBox = document.getElementsByClassName("card_detailsBox")[0];
const firstCardDetails = document.getElementsByClassName("card_details")[0];
const firstEditDetails = document.getElementsByClassName("edit_detail")[0];
const firstCardAttachment = document.getElementsByClassName("add")[0];


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

//カードの添付表示の要素を取得
const attachmentTilte = document.getElementById("attachment_title");
const attachmentMemo = document.getElementById("attachment_memo");
const attachment = document.getElementById("attachment");
const picture = document.getElementById("picture");


//カードの添付表示をオンにして、カードの要素をコンテナに渡すイベントリスナー
const attachmentOn = (detailElm, titleText, memoText, img) => {
    detailElm.addEventListener("click",
        () => {
            attachmentTilte.innerText = `${titleText}`;
            attachmentMemo.innerText = `${memoText}`;
            picture.src = `${img}`;
            attachment.style.visibility = "visible";
        }
    )
}

//カードの添付表示をオフにするイベントリスナー
const backBtn = document.getElementById("back");
backBtn.addEventListener("click",
    () => {
        document.getElementById("attachment").style.visibility = "hidden";
    }
)




//要素を作成しクラス名をつける関数
const createElement = (element, className) => {
    const paragraph = document.createElement(element);
    paragraph.className = className;
    return paragraph
}

//カード内の要素を作成するイベントリスナー
const addDetail = (addDetailsBox, card_detailContainer, card, cardHeight) => {
    let clickCounter = 0;
    addDetailsBox.addEventListener("click",
        () => {
            clickCounter = clickCounter + 1;
            const NewCard_detailsBox = createElement("div", "card_detailsBox");
            const NewCard_Details = createElement("h4", "card_details");
            const NewCard_EditDetail = createElement("input", "edit_detail");
            const NewCard_add = createElement("button", "add");
            const cardTitle = card.getElementsByClassName("card_title")[0];
            card_detailContainer.appendChild(NewCard_detailsBox);
            NewCard_detailsBox.appendChild(NewCard_Details);
            NewCard_detailsBox.appendChild(NewCard_EditDetail);
            NewCard_detailsBox.appendChild(NewCard_add);
            NewCard_add.innerText = "…";
            card_detailContainer.appendChild(addDetailsBox);
            card.style.height = `${cardHeight + (70 * clickCounter)}px`;
            editDetailOn(NewCard_Details, NewCard_EditDetail);
            editDetailOff(NewCard_Details, NewCard_EditDetail);
            attachmentOn(NewCard_add, cardTitle.innerText, NewCard_Details.innerText);
        }
    )

}


//1枚目のカード内のオブジェクトにイベントリスナーを追加
editTitleVisible(firstCardTitle, firstCardTitleEdit);
editTitleVisibleOff(firstCardTitle, firstCardTitleEdit);
addDetail(firstAddDetailsBox, firstCard_detailContainer, firstCard, 150);
editDetailOn(firstCardDetails, firstEditDetails);
editDetailOff(firstCardDetails, firstEditDetails);
attachmentOn(firstCardAttachment, firstCardTitle.innerText, firstCardDetails.innerText);


//カードを配置するchildContainerの要素を取得
const childContainer = document.getElementById("childContainer");
const addCardBtn = document.getElementById("card_add");

//カードを生成する関数
const addCard = (memo, title) => {
    //カードの外枠とタイトル、中枠を作成
    const card = createElement("div", "card");
    const card_title = createElement("h2", "card_title");
    const card_titleInput = createElement("input", "card_titleInput");
    card_titleInput.value = "input_title";
    const card_detailContainer = createElement("div", "card_detailContainer");
    //DBのタイトルが引数にあればタイトルに表示
    if (typeof (title) === "string") {
        card_title.innerText = `${title}`;
        card_titleInput.value = `${title}`;
    } else { card_title.innerText = "Title" }
    //作成したタイトルにイベントリスナを設定
    editTitleVisible(card_title, card_titleInput);
    editTitleVisibleOff(card_title, card_titleInput);
    //作成した外枠とタイトル中枠を追加    
    childContainer.appendChild(card);
    card.appendChild(card_title);
    card.appendChild(card_titleInput);
    card.appendChild(card_detailContainer);
    //カードの高さを初期化
    let cardHeight = 0;
    if (typeof (memo.length) === "number") {
        for (let i = 0; i <= memo.length - 1; i++) {
            //子要素を作成
            const card_detailsBox = createElement("div", "card_detailsBox");
            const card_Details = createElement("h4", "card_details");
            const edit_detail = createElement("input", "edit_detail");
            const add = createElement("button", "add");
            add.innerText = "…";
            //DBのmemoの要素を表示
            card_Details.innerText = `${memo[i].text}`;
            edit_detail.value = `${memo[i].text}`;
            //子要素にイベントリスナを設定    
            editDetailOn(card_Details, edit_detail);
            editDetailOff(card_Details, edit_detail);
            attachmentOn(add, card_title.innerText, card_Details.innerText, memo[i].img);
            //子要素を中枠に追加
            card_detailContainer.appendChild(card_detailsBox);
            card_detailsBox.appendChild(card_Details);
            card_detailsBox.appendChild(edit_detail);
            card_detailsBox.appendChild(add);
            cardHeight = (i * 70);
        }
    } else {
        //子要素を作成
        const card_detailsBox = createElement("div", "card_detailsBox");
        const card_Details = createElement("h4", "card_details");
        const edit_detail = createElement("input", "edit_detail");
        const add = createElement("button", "add");
        add.innerText = "…";
        //子要素にイベントリスナを設定    
        editDetailOn(card_Details, edit_detail);
        editDetailOff(card_Details, edit_detail);
        attachmentOn(add, card_title.innerText, card_Details.innerText);
        //子要素を中枠に追加
        card_detailContainer.appendChild(card_detailsBox);
        card_detailsBox.appendChild(card_Details);
        card_detailsBox.appendChild(edit_detail);
        card_detailsBox.appendChild(add);

    }
    cardHeight = 150 + cardHeight;
    card.style.height = `${cardHeight}px`;
    //子要素の追加ボタンを作成
    const addDetailsBox = createElement("div", "addDetailsBox");
    const addDetails = createElement("h4", "addDetails");
    //追加ボタンのイベントリスナを設定
    addDetail(addDetailsBox, card_detailContainer, card, cardHeight);
    addDetails.innerText = "+カードの追加";
    //追加ボタンを中枠最後に追加    
    card_detailContainer.appendChild(addDetailsBox);
    addDetailsBox.appendChild(addDetails);
    //カードの追加ボタンを最後へ移動
    childContainer.appendChild(addCardBtn);
}


//カードの追加を押すと要素を生成    
addCardBtn.addEventListener("click", addCard);

//データベース読み込み
const DBswitch = document.getElementsByClassName("DB")[0];
DBswitch.addEventListener("click",
    () => {
        for (let i = 0; i <= DB.length - 1; i++) {
            addCard(DB[i].memo, DB[i].title);
        }
        firstCard.style.visibility = "hidden";
        firstCard.style.width = `${0}px`;
        document.getElementById("menu-list").style.visibility = "visible";
    }

)




//データベース
const DB =
    [
        {
            title: "プロフィール",
            memo: [
                { text: "名前 山口智也" },
                { text: "出身地 愛知県豊田市" },
                { text: "住所 名古屋市昭和区" },
                { text: "家族 妻と保護猫2匹", img: "IMG_0256.JPG" },
                { text: "職場 上郷エンジン鋳造部" },
                { text: "業務内容 現場向けのDXツール制作、保守保全", img: "apps1.png" }
            ]
        },
        {
            title: "趣味",
            memo: [
                { text: "音楽鑑賞 DJ", img: "IMG_0094.jpg" },
                { text: "料理" , img: "IMG_3869.heic"},
                { text: "散歩" },
                { text: "バスケの試合観戦(NBA)" }

            ]
        },
        {
            title: "好きなアーティスト",
            memo: [
                { text: "Anderson.Paak" },
                { text: "Alicia keys" },
                { text: "Craig David" },
                { text: "Disclosure" },
                { text: "FKJ" },
                { text: "Goldlink" },
                { text: "Surface" },
                { text: "the1975" },
                { text: "Justin Timberlake" },
                { text: "Offspring" },
                { text: "oasis" },
                { text: "sum41" },
                { text: "Green Day" },
                { text: "Khalid" }
            ]
        },
        {
            title: "なぜDIGを受講したのか",
            memo: [{ text: "PowerPlatformだけで出来ることに限りがあるから" },
            { text: "現場で使うデジタルアイテムは現場で作りたい" },
            { text: "スキルを身に着けて出来ることを増やしたい" }
            ]
        },
        {
            title: "受講してよかったこと",
            memo: [{ text: "一からWebコンテンツを作れるようになった" },
            { text: "プログラミング言語習得の敷居が下がった" },
            { text: "工場外、社外で横の繋がりが出来た" }
            ]
        },
        {
            title: "苦戦したこと",
            memo: [{ text: "教育と業務の両立" ,
                text:"初めての制作。　とにかくエラーとの戦いでした。"
            }]
        },
        {
            title: "今後挑戦したいこと",
            memo: [
                { text: "DBや外部とのデータの連携" },
                { text: "3Dモデルを扱えるライブラリ(Three.jsや)pytonの物体検知のライブラリなど組み込んだアプリを作りたい" }
            ]
        }
    ]

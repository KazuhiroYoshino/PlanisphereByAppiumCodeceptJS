let reserveTestTable = new DataTable(['メルアド', 'パスワード', '氏名', 'ランク', '住所', '電話', '性別', '生年月日', 'お知らせ', '向き']);
reserveTestTable.add(['harunobu@example.jp','password','武田晴信','プレミアム会員','兵庫県加古川市','','男性','','受け取らない','縦向き']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','プレミアム会員','兵庫県加古川市','01234567890','回答しない','1960-12-11','受け取らない','縦向き']);
reserveTestTable.add(['masatora@example.jp','pass5678','真田昌虎','プレミアム会員','兵庫県加古川市','01234567890','女性','','受け取る','縦向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','一般会員','','','その他','1960-12-11','受け取らない','縦向き']);

Feature('会員登録機能_By_Nexus4');

Data(reserveTestTable).Scenario('会員登録_ログイン_Planメニュー確認_退会', async({I , current}) => {
    I.amOnPage('https://hotel.testplanisphere.dev/ja/');
    if(current.向き == '縦向き'){
        I.setOrientation('PORTRAIT');
    }
    if(current.向き == '横向き'){
        I.setOrientation('LANDSCAPE');
    }
//会員登録
    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#navbarNav > ul > li:nth-child(3) > a');
    I.click('会員登録');
    I.fillField('email', current.メルアド);
    I.fillField('password', current.パスワード);
    I.fillField('password-confirmation', current.パスワード);
    I.fillField('username', current.氏名);
    if(current.ランク == 'プレミアム会員'){
        I.click('input[name="rank"]');
    }
    if(current.ランク == '一般会員'){
        I.click('#rank-normal');
    }
    if((current.住所).length != 0){
        I.fillField('address', current.住所)
    }
    if((current.電話).length != 0){
        I.fillField('tel', current.電話);
    }
    if(current.性別 == '男性'){
        I.selectOption('gender', '男性');
    }
    if(current.性別 == '女性'){
        I.selectOption('gender', '女性');
    }
    if(current.性別 == 'その他'){
        I.selectOption('gender', 'その他');
    }
    if(current.性別 == '回答しない'){
        I.selectOption('gender', '回答しない');
    }
    if((current.生年月日).length != 0){
         birth = current.生年月日;
        I.executeScript(function(birth) {
//            var bDay = birth;
            var bDay = '1960-12-11';
            $(birthday).val(bDay);
        });
    }
    if(current.お知らせ == '受け取る'){
        I.checkOption('notification');
    }
    I.click('登録');

    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#logout-form > button');
    I.click('ログアウト');

//登録したアカウントで再ログイン。登録内容の検証
    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#navbarNav > ul > li:nth-child(3) > a');
    I.click('ログイン');
    I.fillField('email', current.メルアド);
    I.fillField('password', current.パスワード);
    I.waitForClickable('#login-button');
    I.click('#login-button');
//    I.waitUrlEquals('https://hotel.testplanisphere.dev/ja/mypage.html');
//    let url = await I.grabSource();
//    I.waitForInvisible('#email');
//    let title = await I.grabTitle();
//    I.waitForElement('#username');
    I.see(current.メルアド);
    I.see(current.氏名);
    I.see(current.ランク)
    if((current.住所).length != 0){
        I.see(current.住所);
    }
    if((current.電話).length != 0){
        I.see(current.電話);
    }
    if(current.性別 == '男性'){
        I.see(current.性別);
    }
    if(current.性別 == '女性'){
        I.see(current.性別);
    }
    if(current.性別 == 'その他'){
        I.see(current.性別);
    }
    if(current.性別 == '回答しない'){
        I.see('未登録');
    }
    if((current.生年月日).length != 0){
        I.checkBirthday(current.生年月日);
    }
    I.see(current.お知らせ);
//宿泊予約メニュー確認
    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#navbarNav > ul > li.nav-item.px-lg-4.active > a');
    I.click('宿泊予約');
    I.scrollPageToBottom();
    if(current.ランク == '一般会員'){
        I.dontSee('プレミアムプラン');
        I.see('ディナー付きプラン');
        I.see('お得なプラン');
//        I.dntSeePlan('card-title', 'プラミアムプラン');
//        I.seePlan('card-title', 'ディナー付きプラン');
//        I.seePlan('card-title', 'お得なプラン');
    }
    if(current.ランク == 'プレミアム会員'){
//        I.scrollIntoView('#plan-list > div:nth-child(1) > div > div.card-header');
        I.see('プレミアムプラン');
//        I.scrollIntoView('#plan-list > div:nth-child(2) > div > div.card-header');
        I.see('ディナー付きプラン');
//        I.scrollIntoView('#plan-list > div:nth-child(3) > div > div.card-header');
        I.see('お得なプラン');
//        I.seePlan('card-title', 'プラミアムプラン');
//        I.seePlan('card-title', 'ディナー付きプラン');
//        I.seePlan('card-title', 'お得なプラン');
    }

//退会
    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#mypage-holder');
    I.click('マイページ');
    I.click('退会する');
    I.seeInPopup('退会すると全ての情報が削除されます。');
    I.acceptPopup();
    I.seeInPopup('退会処理を完了しました。ご利用ありがとうございました。');
    I.acceptPopup();
});

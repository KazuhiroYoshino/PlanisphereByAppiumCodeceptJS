let reserveTestTable = new DataTable(['メルアド','パスワード','氏名','ランク','住所','電話','性別','生年月日','お知らせ','宿泊プラン','宿泊初日','連泊数','宿泊人数','朝食','昼からチェックインプラン','お得な観光プラン','確認のご連絡','電話番号','ご要望','部屋タイプ','合計料金','向き']);
reserveTestTable.add(['harunobu@example.jp','password','武田晴信','一般会員','京都府宇治市','01234567890','男性','1960-12-11','受け取る','カップル限定プラン','Monday','2','2','on','on','on','メールでのご連絡','','144文字','プレミアムツイン','40000','横向き']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','一般会員','','','男性','1960-12-11','受け取らない','お得なプラン','Wednesday','9','1','on','off','on','メールでのご連絡','','off','部屋指定なし','67000','縦向き']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','一般会員','','','男性','1960-12-11','受け取らない','お得な特典付きプラン','Tuesday','1','1','off','off','on','電話でのご連絡','01234567890','144文字','スタンダードツイン','8000','縦向き']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','一般会員','','','男性','1960-12-11','受け取らない','ディナー付きプラン','Thursday','3','4','off','on','off','メールでのご連絡','','144文字','部屋指定なし','114500','横向き']);
reserveTestTable.add(['masatora@example.jp','pass5678','真田昌虎','一般会員','京都府宇治市','','男性','1960-12-11','受け取る','貸し切り露天風呂プラン','Sunday','1','6','off','on','on','電話でのご連絡','01234567890','144文字','部屋指定なし','79500','縦向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','一般会員','','01234567890','女性','1960-12-11','受け取らない','素泊まり','Wednesday','1','2','off','on','on','電話でのご連絡','','144文字','シングル','15000','縦向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','一般会員','','01234567890','女性','1960-12-11','受け取らない','貸し切り露天風呂プラン','Thursday','1','6','on','on','on','電話でのご連絡','','off','部屋指定なし','72000','横向き']);
reserveTestTable.add(['harunobu@example.jp','password','武田晴信','プレミアム会員','京都府宇治市','01234567890','男性','1960-12-11','受け取る','お得な特典付きプラン','Friday','1','9','on','off','off','メールでのご連絡','','144文字','スタンダードツイン','72000','横向き']);
reserveTestTable.add(['harunobu@example.jp','password','武田晴信','プレミアム会員','京都府宇治市','01234567890','男性','1960-12-11','受け取る','プレミアムプラン','Friday','1','9','on','on','off','希望しない','','144文字','プレミアムツイン','108000','縦向き']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','プレミアム会員','','','男性','1960-12-11','受け取らない','貸し切り露天風呂プラン','Tuesday','3','1','off','off','on','希望しない','','144文字','部屋指定なし','28000','横向き']);
reserveTestTable.add(['masatora@example.jp','pass5678','真田昌虎','プレミアム会員','京都府宇治市','','男性','1960-12-11','受け取る','エステ・マッサージプラン','Saturday','1','1','on','on','on','電話でのご連絡','01234567890','off','部屋指定なし','14250','横向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','プレミアム会員','','01234567890','女性','1960-12-11','受け取らない','カップル限定プラン','Sunday','2','2','on','on','off','希望しない','','144文字','プレミアムツイン','42000','横向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','プレミアム会員','','01234567890','女性','1960-12-11','受け取らない','ディナー付きプラン','Thursday','3','4','off','off','off','電話でのご連絡','','off','部屋指定なし','110500','縦向き']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','プレミアム会員','','01234567890','女性','1960-12-11','受け取らない','テーマパーク優待プラン','Sunday','5','9','off','on','off','希望しない','','144文字','部屋指定なし','481500','横向き']);

const message = '123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC12345678';

Feature('Member予約機能_By_Nexus9');

Data(reserveTestTable).Scenario('Member予約_部屋タイプ確認_料金確認_By_Nexus9', async({I , current}) => {
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

//会員で予約
    if(current.向き == '縦向き'){
        I.click('body > nav > button');
    }
    I.waitForClickable('#navbarNav > ul > li:nth-child(3) > a');
    I.click('宿泊予約');
    I.clickPlan(current.宿泊プラン);
    I.switchToNextTab(1);
    I.see(current.宿泊プラン);
    I.fromDay(current.宿泊初日);
    I.click('閉じる');
    I.fillField('term', current.連泊数);
    I.fillField('head-count', current.宿泊人数);
    if(current.朝食 == 'on'){
        I.checkOption('#breakfast');
    }
    if(current.昼からチェックインプラン == 'on'){
        I.checkOption('#early-check-in');
    }
    if(current.お得な観光プラン == 'on'){
        I.checkOption('#sightseeing');
    }
//会員は氏名が初期値として入力される
    I.seeInField('username', current.氏名);
    I.selectOption('contact', current.確認のご連絡);
    if(current.確認のご連絡 == 'メールでのご連絡'){
        if((current.メルアド).length != 0) {
//会員はメールアドレスが登録されていたら初期値として入力済みになる
            I.seeInField('#email', current.メルアド);
        }else{
            I.fillField('email', current.メルアド);
        }
    }
    if(current.確認のご連絡 == '電話でのご連絡'){
            if((current.電話).length != 0) {
//会員は電話番号が登録されていたら初期値として入力済みになる
                I.seeInField('#tel', current.電話);
            }else{
                I.fillField('tel', current.電話番号)
            }
    }
    if(current.ご要望 == '144文字'){
        I.fillField('comment', message);
    }
    if((current.宿泊プラン == 'お得な特典付きプラン') || (current.宿泊プラン == 'プレミアムプラン') || (current.宿泊プラン == '素泊まり') || (current.宿泊プラン == '出張ビジネスプラン') || (current.宿泊プラン == 'カップル限定プラン')){
        I.switchTo('#room-info > iframe');
        I.see(current.部屋タイプ);
        I.switchTo();
    }else{
        I.see(current.部屋タイプ);
    }
    I.seeBill(current.合計金額, '#total-bill');

    let term = await I.grabValueFrom('#term');
    let headcount = await I.grabValueFrom('#head-count');
    I.click('予約内容を確認する');
//確認画面
    I.see(current.宿泊プラン);
    I.seeBill(current.合計料金, '#total-bill');
    I.seeTerm(term);
    I.seeHeadCount(headcount);
    if(current.朝食 == 'on'){
        I.see('朝食バイキング');
    }
    if(current.昼からチェックインプラン == 'on'){
        I.see('昼からチェックインプラン');
    }
    if(current.お得な観光プラン == 'on') {
        I.see('お得な観光プラン');
    }
    I.see(current.氏名);
    if(current.確認のご連絡 == '希望しない'){
        I.see('希望しない');
    }
    if(current.確認のご連絡 == 'メールでのご連絡'){
        I.see(current.メルアド);
    }
    if(current.確認のご連絡 == '電話でのご連絡'){
        I.see(current.電話番号);
    }
    if(current.ご要望 == '144文字'){
        I.see(message);
    }
    I.click('この内容で予約する');

//予約完了画面
    I.see('予約を完了しました');
    I.see('ご来館、心よりお待ちしております。');
    I.click('閉じる');
});
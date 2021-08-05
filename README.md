# EXCEL-OUTPUT

対象ディレクトリ内の全てのファイル情報リストを.xlsxファイルにて出力するアプリ

# デモ

<img width="712" alt="スクリーンショット 2021-08-05 13 47 19" src="https://user-images.githubusercontent.com/58904417/128292693-8fb46e16-6dd1-4819-aad2-3878401ccdd2.png">
ディレクトリ検索ボタンを押して、ダイアログにてディレクトリを指定、もしくは
ドラッグアンドドロップにてディレクトリをドロップすることでディレクトリパスが表示されます
<img width="668" alt="スクリーンショット 2021-08-05 13 53 58" src="https://user-images.githubusercontent.com/58904417/128293032-b1367a61-997b-4d34-8ce0-52314a28150a.png">
ディレクトリパスが指定されていると「EXCELファイル出力」ボタンが表示され、クリックすると対象ディレクトリ内に
対象ディレクトリ内の全てのファイル情報がリスト化された「ディレクトリ名.xlsx」ファイルが出力されます
<img width="402" alt="スクリーンショット 2021-08-05 13 59 59" src="https://user-images.githubusercontent.com/58904417/128293390-83aad7b1-8ad9-4320-804a-fefa21931a4d.png">

# 動作環境

* node 15.3.0
* npm 7.0.14

# 環境インストール方法

1. https://nodejs.org/ja にてNodeをインストールする
2. 以下コマンドにてnpmをインストールする
```bash
sudo npm install -g npm
```

# アプリインストール方法

1. リポジトリをクローンする```git clone https://github.com/kozimatakesi/output_excel.git```
2. モジュールをインストールする```npm install```
3. 別のターミナルにて```npm run watch```を実行し、コードをコンパイルする
4. さらに別のターミナルにて```npm start```を実行するとアプリが起動する

# ビルドコマンド

・Macの場合```npm run bulid:mac```
・Windowsの場合```npm run build:windows```

# 作者

* 作成者 川本直也
* 所属 DevCranes
* E-mail riverbook708@gmail.com

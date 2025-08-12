<?php
// 必要に応じてバリデーションを追加してください

// 送信先メールアドレス
$to = "shi.970504.ri@gmail.com";

// 件名
$subject = "お問い合わせがありました";

// メール本文を作成
$textMessage = "お問い合わせ種別: " . ($_POST['type'] ?? "") . "\n";
$textMessage .= "お名前: " . ($_POST['name'] ?? "") . "\n";
$textMessage .= "フリガナ: " . ($_POST['name_kana'] ?? "") . "\n";
$textMessage .= "メールアドレス: " . ($_POST['email'] ?? "") . "\n";
$textMessage .= "お問い合わせ内容:\n" . ($_POST['message'] ?? "") . "\n";

// 画像ファイルの添付処理は別途必要

// ヘッダー情報（返信先など）
$from = "info@shi970504ri.shop";
$replyTo = $_POST['email'] ?? "";
$headers = "From: {$from}\r\n";
if (!empty($replyTo)) {
    $headers .= "Reply-To: {$replyTo}\r\n";
}

// MIME境界線を生成
$boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

// ヘッダーにContent-Type追加（マルチパート）
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// メール本文の構築
$message = "--{$boundary}\r\n";
$message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $textMessage . "\r\n";

// 添付ファイルを処理（画像のみ添付）
if (isset($_FILES['picture']) && is_array($_FILES['picture']['name'])) {
    for ($i = 0; $i < count($_FILES['picture']['name']); $i++) {
        // ファイルがアップロードされているかチェック
        if ($_FILES['picture']['error'][$i] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['picture']['tmp_name'][$i];
            $fileName = $_FILES['picture']['name'][$i];
            $fileType = mime_content_type($tmpName); // ex: image/jpeg

            // 画像ファイルかチェック（念のため）
            if (strpos($fileType, 'image/') === 0) {
                $fileContent = chunk_split(base64_encode(file_get_contents($tmpName)));

                // 添付パートを追加
                $message .= "--{$boundary}\r\n";
                $message .= "Content-Type: {$fileType}; name=\"{$fileName}\"\r\n";
                $message .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
                $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $message .= $fileContent . "\r\n";
            }
        }
    }
}

$message .= "--{$boundary}--\r\n";

// 送信
if(mail($to, $subject, $message, $headers)){
	header("Location: /94_contact/contact.html?sent=1");
	exit;
} else {
	$msg = "送信に失敗しました";
}
?>
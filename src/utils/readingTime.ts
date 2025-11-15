// 読了時間を計算する関数
export function calculateReadingTime(content: string): number {
  // 日本語と英語の単語数をカウント
  const japaneseChars = content.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g)?.length || 0;
  const englishWords = content.match(/[a-zA-Z]+/g)?.length || 0;

  // 日本語: 400文字/分、英語: 200単語/分
  const japaneseMinutes = japaneseChars / 400;
  const englishMinutes = englishWords / 200;

  const totalMinutes = Math.ceil(japaneseMinutes + englishMinutes);
  return Math.max(1, totalMinutes); // 最低1分
}

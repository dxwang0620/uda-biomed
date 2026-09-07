import { useEffect, useId, useRef, useState } from "react";
import styles from "./ConsentDialog.module.css";

/**
 * 展開聯絡表單前的使用者說明書彈窗（指定）：勾選同意才放行。
 *
 * 用原生 <dialog> 的 showModal()，不是自己刻一層 div：
 * 焦點鎖定、Esc 關閉、關閉後焦點回到觸發元素、背景 inert，
 * 這四件事瀏覽器都做好了，自己實作只會少做其中幾樣。
 * 唯一要自己補的是背景捲動——showModal() 不會鎖住頁面捲動。
 *
 * ⚠️ **說明書內文是佔位。** 這一段的性質是同意事項（蒐集目的、蒐集項目、
 * 保存期限、聯絡窗口），寫錯的後果比版面難看嚴重得多，所以一個字都不編。
 * 需要你提供正式文字，見 docs/content-contact.md。
 */

export type ConsentTopic = {
  /** 彈窗標題 */
  title: string;
  /** 標題底下的中文副標，與面板標籤一致 */
  titleZh: string;
};

export default function ConsentDialog({
  topic,
  onAgree,
  onCancel,
}: {
  /** null＝不顯示 */
  topic: ConsentTopic | null;
  onAgree: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [checked, setChecked] = useState(false);
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (topic) {
      setChecked(false);
      if (!el.open) el.showModal();
      /* showModal() 不鎖背景捲動，滑鼠滾輪仍會把底下的頁面捲走 */
      document.body.style.overflow = "hidden";
    } else if (el.open) {
      el.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [topic]);

  /* **不能在沒有 topic 時 return null。** 那樣 React 會在 effect 呼叫 close()
     之前就把 <dialog> 從 DOM 移除，原生的「關閉後把焦點還給觸發元素」也就
     跟著失效——實測取消之後焦點掉到 body。元素常駐，只有內容跟著切換。 */
  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      /* Esc 也走這裡，取消與關閉是同一件事 */
      onClose={onCancel}
      /* 點背景關閉。<dialog> 的點擊事件目標是 dialog 本身時，
         代表點在 ::backdrop 上——內容區都有自己的元素會擋住。 */
      onClick={(e) => {
        if (e.target === ref.current) onCancel();
      }}
    >
      {topic ? (
        <div className={styles.inner}>
          <p className={styles.eyebrow}>User guide</p>
          <h2 id={titleId} className={styles.title}>
            {topic.title}
            <span className={styles.titleZh} lang="zh-Hant">
              {topic.titleZh}
            </span>
          </h2>

          <div id={bodyId} className={styles.body}>
            {/* CLAUDE.md 工作方式第 3 條：缺文案時用明確的 placeholder。
              同意事項不編造。 */}
            <p className={styles.todo} lang="zh-Hant">
              [待補：使用者說明書內文]
            </p>
            <ul className={styles.todoList} lang="zh-Hant">
              <li>[待補：蒐集目的]</li>
              <li>[待補：蒐集項目與使用方式]</li>
              <li>[待補：保存期限與刪除方式]</li>
              <li>[待補：聯絡窗口]</li>
            </ul>
          </div>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>
              I have read the user guide and agree to continue.
              <span className={styles.checkZh} lang="zh-Hant">
                我已閱讀並同意上述說明
              </span>
            </span>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Cancel
            </button>
            {/* 未勾選時禁用，而不是按下去才報錯——這是唯一的放行條件，
              直接讓按鈕反映狀態比事後跳錯誤訊息清楚。 */}
            <button
              type="button"
              className={styles.agree}
              disabled={!checked}
              onClick={onAgree}
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

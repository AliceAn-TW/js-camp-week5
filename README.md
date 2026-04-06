# 第五週作業：JavaScript 模組化開發

## 學習目標

本週練習 JavaScript 函式拆分與資料處理：

- 函式設計與模組化思維
- 陣列方法（find、filter、map、reduce）
- 不可變性（Immutability）概念

---

## Step 1：環境準備

### 確認 Node.js 版本

```bash
node -v
# 建議 v18 以上
```

> 本週不需要安裝任何套件，只要有 Node.js 就能執行。

---

## Step 2：了解作業內容

### 檔案結構

- homework.js：作業檔案（同學程式撰寫處）
- test.js：測試檔案
- README.md：說明文件

---

## Step 3：完成各項任務

### 任務一：產品查詢模組

需完成以下函式：

| 函式名稱                                    | 說明                   | 提示                |
| ------------------------------------------- | ---------------------- | ------------------- |
| `getProductById(products, productId)`       | 根據 ID 查詢產品       | `find()`            |
| `getProductsByCategory(products, category)` | 根據分類篩選           | `filter()`          |
| `getDiscountRate(product)`                  | 計算折扣率（如 "8折"） | `Math.round()`      |
| `getAllCategories(products)`                | 取得不重複分類         | `Set` 或 `filter()` |

### 任務二：購物車計算模組

需完成以下函式：

| 函式名稱                            | 說明             | 提示                 |
| ----------------------------------- | ---------------- | -------------------- |
| `calculateCartOriginalTotal(carts)` | 原價總金額       | `reduce()`           |
| `calculateCartTotal(carts)`         | 售價總金額       | `reduce()`           |
| `calculateSavings(carts)`           | 省下金額         | 原價 - 售價          |
| `calculateCartItemCount(carts)`     | 商品總數量       | `reduce()`           |
| `isProductInCart(carts, productId)` | 檢查是否在購物車 | `some()` 或 `find()` |

### 任務三：購物車操作模組

需完成以下函式：

| 函式名稱                                             | 說明       | 重要提示           |
| ---------------------------------------------------- | ---------- | ------------------ |
| `addToCart(carts, product, quantity)`                | 新增商品   | **不可修改原陣列** |
| `updateCartItemQuantity(carts, cartId, newQuantity)` | 更新數量   | 數量 ≤ 0 需移除    |
| `removeFromCart(carts, cartId)`                      | 移除商品   | `filter()`         |
| `clearCart()`                                        | 清空購物車 | 回傳 `[]`          |

**提醒：購物車操作的函式需回傳「新陣列」，不可修改原本的 carts 陣列！**

概念舉例：

```javascript
// ❌ 錯誤：直接修改原陣列
function addToCart(carts, product, quantity) {
	carts.push({ product, quantity });
	return carts;
}

// ✓ 正確：回傳新陣列
function addToCart(carts, product, quantity) {
	return [...carts, { id: "cart-new", product, quantity }];
}
```

### 任務四：訂單統計模組

需完成以下函式：

| 函式名稱                               | 說明           | 提示                |
| -------------------------------------- | -------------- | ------------------- |
| `calculateTotalRevenue(orders)`        | 已付款訂單營收 | 只計算 `paid: true` |
| `filterOrdersByStatus(orders, isPaid)` | 篩選訂單狀態   | `filter()`          |
| `generateOrderReport(orders)`          | 產生統計報表   | 回傳物件            |
| `groupOrdersByPayment(orders)`         | 依付款方式分組 | `reduce()`          |

**generateOrderReport 回傳格式：**

```javascript
{
  totalOrders: 2,
  paidOrders: 1,
  unpaidOrders: 1,
  totalRevenue: 899,
  averageOrderValue: 1498
}
```

---

## Step 4：測試與驗證

### 4.1 快速測試（查看 console.log 輸出）

```bash
node homework.js
```

### 4.2 完整測試（執行 test.js）

```bash
node test.js
```

測試結果範例：

```text
========== 任務一：產品查詢模組 ==========

✓ getProductById - 找到產品應回傳物件
✓ getProductById - 找不到應回傳 null
✓ getProductsByCategory - 應回傳陣列
✓ getProductsByCategory - 篩選衣服應有 2 筆
...

==========================================
測試結果: 34 通過, 0 失敗, 共 34 項
==========================================

🎉 太棒了！所有測試都通過了！
```

---

## 常用陣列方法參考

| 方法       | 用途           | 範例                                             |
| ---------- | -------------- | ------------------------------------------------ |
| `find()`   | 找單一元素     | `arr.find(item => item.id === 'xxx')`            |
| `filter()` | 篩選多個元素   | `arr.filter(item => item.price > 100)`           |
| `map()`    | 轉換每個元素   | `arr.map(item => item.name)`                     |
| `reduce()` | 累加/彙整      | `arr.reduce((sum, item) => sum + item.price, 0)` |
| `some()`   | 是否有符合條件 | `arr.some(item => item.id === 'xxx')`            |

---

## 繳交方式

1. 完成 `homework.js` 中的所有函式
2. 執行 `node test.js` 確保測試通過
3. 將程式碼上傳至 GitHub
4. 提交 GitHub Repo 連結

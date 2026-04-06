// ========================================
// 第五週作業測試（原生 JS 版本）
// 執行方式：node test.js
// ========================================

const homework = require('./homework.js');

// 測試資料
const products = [
  { id: 'prod-1', title: '經典白T', category: '衣服', origin_price: 500, price: 399 },
  { id: 'prod-2', title: '牛仔褲', category: '褲子', origin_price: 1200, price: 899 },
  { id: 'prod-3', title: '帆布鞋', category: '鞋子', origin_price: 1800, price: 1299 },
  { id: 'prod-4', title: '棒球帽', category: '配件', origin_price: 350, price: 299 },
  { id: 'prod-5', title: '運動外套', category: '衣服', origin_price: 2000, price: 1599 }
];

const carts = [
  { id: 'cart-1', product: products[0], quantity: 2 },
  { id: 'cart-2', product: products[2], quantity: 1 },
  { id: 'cart-3', product: products[4], quantity: 1 }
];

const orders = [
  { id: 'order-1', createdAt: 1704067200, paid: false, total: 2097, user: { payment: 'ATM' } },
  { id: 'order-2', createdAt: 1704153600, paid: true, total: 899, user: { payment: 'Credit Card' } }
];

// ========================================
// 簡易測試框架
// ========================================
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  錯誤: ${error.message}`);
    failed++;
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`預期 ${expected}，但得到 ${actual}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`預期 ${JSON.stringify(expected)}，但得到 ${JSON.stringify(actual)}`);
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`預期 null，但得到 ${actual}`);
      }
    },
    toBeArray() {
      if (!Array.isArray(actual)) {
        throw new Error(`預期陣列，但得到 ${typeof actual}`);
      }
    },
    toHaveLength(length) {
      if (actual.length !== length) {
        throw new Error(`預期長度 ${length}，但得到 ${actual.length}`);
      }
    },
    toContain(item) {
      if (!actual.includes(item)) {
        throw new Error(`預期包含 ${item}，但不存在`);
      }
    },
    toBeGreaterThan(num) {
      if (actual <= num) {
        throw new Error(`預期大於 ${num}，但得到 ${actual}`);
      }
    }
  };
}

// ========================================
// 任務一：產品查詢模組
// ========================================
console.log('\n========== 任務一：產品查詢模組 ==========\n');

test('getProductById - 找到產品應回傳物件', () => {
  const result = homework.getProductById(products, 'prod-1');
  expect(result.id).toBe('prod-1');
});

test('getProductById - 找不到應回傳 null', () => {
  const result = homework.getProductById(products, 'not-exist');
  expect(result).toBeNull();
});

test('getProductsByCategory - 應回傳陣列', () => {
  const result = homework.getProductsByCategory(products, '衣服');
  expect(result).toBeArray();
});

test('getProductsByCategory - 篩選衣服應有 2 筆', () => {
  const result = homework.getProductsByCategory(products, '衣服');
  expect(result).toHaveLength(2);
});

test('getProductsByCategory - 全部應回傳所有產品', () => {
  const result = homework.getProductsByCategory(products, '全部');
  expect(result).toHaveLength(5);
});

test('getDiscountRate - 應回傳字串', () => {
  const result = homework.getDiscountRate(products[0]);
  expect(typeof result).toBe('string');
});

test('getDiscountRate - 應包含「折」', () => {
  const result = homework.getDiscountRate(products[0]);
  expect(result).toContain('折');
});

test('getAllCategories - 應回傳陣列', () => {
  const result = homework.getAllCategories(products);
  expect(result).toBeArray();
});

test('getAllCategories - 應有 4 個分類（不重複）', () => {
  const result = homework.getAllCategories(products);
  expect(result).toHaveLength(4);
});

// ========================================
// 任務二：購物車計算模組 
// ========================================
console.log('\n========== 任務二：購物車計算模組 ==========\n');

test('calculateCartOriginalTotal - 應回傳數字', () => {
  const result = homework.calculateCartOriginalTotal(carts);
  expect(typeof result).toBe('number');
});

test('calculateCartOriginalTotal - 計算正確 (500*2 + 1800 + 2000 = 4800)', () => {
  const result = homework.calculateCartOriginalTotal(carts);
  expect(result).toBe(4800);
});

test('calculateCartTotal - 應回傳數字', () => {
  const result = homework.calculateCartTotal(carts);
  expect(typeof result).toBe('number');
});

test('calculateCartTotal - 計算正確 (399*2 + 1299 + 1599 = 3696)', () => {
  const result = homework.calculateCartTotal(carts);
  expect(result).toBe(3696);
});

test('calculateSavings - 計算正確 (4800 - 3696 = 1104)', () => {
  const result = homework.calculateSavings(carts);
  expect(result).toBe(1104);
});

test('calculateCartItemCount - 計算正確 (2 + 1 + 1 = 4)', () => {
  const result = homework.calculateCartItemCount(carts);
  expect(result).toBe(4);
});

test('isProductInCart - 存在應回傳 true', () => {
  const result = homework.isProductInCart(carts, 'prod-1');
  expect(result).toBe(true);
});

test('isProductInCart - 不存在應回傳 false', () => {
  const result = homework.isProductInCart(carts, 'prod-2');
  expect(result).toBe(false);
});

// ========================================
// 任務三：購物車操作模組
// ========================================
console.log('\n========== 任務三：購物車操作模組 ==========\n');

test('addToCart - 應回傳新陣列', () => {
  const result = homework.addToCart(carts, products[1], 2);
  expect(result).toBeArray();
});

test('addToCart - 不應修改原陣列', () => {
  const originalLength = carts.length;
  homework.addToCart(carts, products[1], 2);
  expect(carts).toHaveLength(originalLength);
});

test('addToCart - 新增不存在的產品應增加一筆', () => {
  const result = homework.addToCart(carts, products[1], 2);
  expect(result).toHaveLength(4);
});

test('updateCartItemQuantity - 應回傳新陣列', () => {
  const result = homework.updateCartItemQuantity(carts, 'cart-1', 5);
  expect(result).toBeArray();
});

test('updateCartItemQuantity - 數量 0 應移除商品', () => {
  const result = homework.updateCartItemQuantity(carts, 'cart-1', 0);
  expect(result).toHaveLength(2);
});

test('removeFromCart - 應回傳新陣列', () => {
  const result = homework.removeFromCart(carts, 'cart-1');
  expect(result).toBeArray();
});

test('removeFromCart - 應減少一筆', () => {
  const result = homework.removeFromCart(carts, 'cart-1');
  expect(result).toHaveLength(2);
});

test('clearCart - 應回傳空陣列', () => {
  const result = homework.clearCart();
  expect(result).toHaveLength(0);
});

// ========================================
// 任務四：訂單統計模組 
// ========================================
console.log('\n========== 任務四：訂單統計模組 ==========\n');

test('calculateTotalRevenue - 應回傳數字', () => {
  const result = homework.calculateTotalRevenue(orders);
  expect(typeof result).toBe('number');
});

test('calculateTotalRevenue - 只計算已付款 (899)', () => {
  const result = homework.calculateTotalRevenue(orders);
  expect(result).toBe(899);
});

test('filterOrdersByStatus - 篩選已付款應有 1 筆', () => {
  const result = homework.filterOrdersByStatus(orders, true);
  expect(result).toHaveLength(1);
});

test('filterOrdersByStatus - 篩選未付款應有 1 筆', () => {
  const result = homework.filterOrdersByStatus(orders, false);
  expect(result).toHaveLength(1);
});

test('generateOrderReport - 應回傳物件', () => {
  const result = homework.generateOrderReport(orders);
  expect(typeof result).toBe('object');
});

test('generateOrderReport - 應有 totalOrders 欄位', () => {
  const result = homework.generateOrderReport(orders);
  expect(result.totalOrders).toBe(2);
});

test('generateOrderReport - 應有 totalRevenue 欄位', () => {
  const result = homework.generateOrderReport(orders);
  expect(result.totalRevenue).toBe(899);
});

test('groupOrdersByPayment - 應回傳物件', () => {
  const result = homework.groupOrdersByPayment(orders);
  expect(typeof result).toBe('object');
});

test('groupOrdersByPayment - ATM 應有 1 筆', () => {
  const result = homework.groupOrdersByPayment(orders);
  expect(result['ATM']).toHaveLength(1);
});

// ========================================
// 測試結果
// ========================================
console.log('\n==========================================');
console.log(`測試結果: ${passed} 通過, ${failed} 失敗, 共 ${passed + failed} 項`);
console.log('==========================================\n');

if (failed === 0) {
  console.log('🎉 太棒了！所有測試都通過了！');
} else {
  console.log(`💪 加油！還有 ${failed} 項測試需要修正`);
}

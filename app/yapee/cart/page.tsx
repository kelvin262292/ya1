'use client'

import { Heading } from '@/components/ui/heading'
import { useCart } from '@/components/yapee/cart-provider'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='container mx-auto px-4 py-8'>
      <Heading size='lg'>Giỏ Hàng</Heading>
      {cartItems.length === 0 ? (
        <p>Chưa có sản phẩm trong giỏ hàng.</p>
      ) : (
        <div className='mt-8'>
          <table className='min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-gray-100 dark:bg-gray-800'>
                <th className='p-3 text-left'>Sản phẩm</th>
                <th className='p-3 text-center'>Số lượng</th>
                <th className='p-3 text-right'>Giá</th>
                <th className='p-3 text-right'>Thành tiền</th>
                <th className='p-3'></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className='border-t border-gray-200 dark:border-gray-700'>
                  <td className='p-3'>{item.name}</td>
                  <td className='p-3 text-center'>
                    <input
                      type='number'
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      className='w-16 text-center border rounded px-2 py-1'
                    />
                  </td>
                  <td className='p-3 text-right'>{item.price.toLocaleString('vi-VN')}₫</td>
                  <td className='p-3 text-right'>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
                  <td className='p-3 text-right'>
                    <Button size='sm' variant='destructive' onClick={() => removeFromCart(item.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between items-center mt-6'>
            <Button variant='outline' onClick={clearCart}>Xóa toàn bộ</Button>
            <div className='text-lg font-bold'>Tổng: {total.toLocaleString('vi-VN')}₫</div>
          </div>
        </div>
      )}
    </div>
  )
}
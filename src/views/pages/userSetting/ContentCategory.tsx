import React from 'react'
import { SortableTree } from './dnd-kit/Tree/SortableTree';
export default function ContentCategory() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl text-center'>카테고리 관리</h1>
      <div className='mt-4'>
        <SortableTree collapsible  removable />
      </div>
    </div>
  )
}

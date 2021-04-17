import React from 'react'

export const ItemTypes = {
    A: 'A',
    B: 'B',
    FOOD: 'food',
    GLASS: 'glass',
    PAPER: 'paper',
    C: 'C'
}
  
export const getType = (type: string) => {
  switch (type) {
      case 'A':
          return ItemTypes.A
      case 'B':
          return ItemTypes.B
      case 'C':
          return ItemTypes.C
  }
  return ItemTypes.A
}

export const availTypes = [ItemTypes.A, ItemTypes.B, ItemTypes.C]
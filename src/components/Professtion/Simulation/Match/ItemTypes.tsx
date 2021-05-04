import React from 'react'

export const ItemTypes = {
    A: 'A',
    B: 'B',
    FOOD: 'food',
    GLASS: 'glass',
    PAPER: 'paper',
    C: 'C',
    D: 'D',
    E: 'E'
}
  
export const getType = (type: string) => {
  switch (type) {
      case 'A':
          return ItemTypes.A
      case 'B':
          return ItemTypes.B
      case 'C':
          return ItemTypes.C
      case 'D':
            return ItemTypes.D
      case 'E':
            return ItemTypes.E
  }
  return ItemTypes.A
}

export const availTypes = [ItemTypes.A, ItemTypes.B, ItemTypes.C, ItemTypes.D, ItemTypes.E]
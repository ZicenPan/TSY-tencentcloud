import React from 'react'

export const ItemTypes = {
    A: 'a',
    B: 'b',
    C: 'c'
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
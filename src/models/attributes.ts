export type attributeType = 'strength' | 'magic' | 'fire'

export class attributes {
  type: attributeType

  constructor(type: attributeType) {
    this.type = type
  }
}

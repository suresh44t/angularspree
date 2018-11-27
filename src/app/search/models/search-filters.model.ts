export default interface ISearchFilter {
  query: string;
  sorting?: string;
  categoryId?: string;
  attributes?: Array<Attribute>;
  range?: IRange;
  skipCount?: number;
}

interface IRange {
  min: number;
  max: number;
}

interface Attribute {
  name: string;
  value: string;
  displayName: string;
}

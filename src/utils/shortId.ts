export default (identity: string) =>
  `${identity.slice(0, 15)}...${identity.slice(-4)}`

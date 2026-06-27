export default function compareAddresses(address1: any, address2: any) {
  const fields = [
    "address_1",
    "address_2",
    "city",
    "province",
    "country_code",
    "postal_code",
    "phone",
    "first_name",
    "last_name",
  ]

  const picked1 = fields.reduce((acc, f) => {
    acc[f] = address1?.[f]
    return acc
  }, {} as Record<string, any>)

  const picked2 = fields.reduce((acc, f) => {
    acc[f] = address2?.[f]
    return acc
  }, {} as Record<string, any>)

  return JSON.stringify(picked1) === JSON.stringify(picked2)
}

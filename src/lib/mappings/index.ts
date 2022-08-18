export const domainStatus: Mappings = {
  expiring: '即将过期',
  expired: '已过期',
  occupied: '已抢注',
  illegal: '违规',
}

export const domainStatusColor: Mappings<StatusColor> = {
  expiring: 'warning',
  expired: 'default',
  occupied: 'error',
  illegal: 'error',
}

export const domainCate: Mappings = {
  no: '不违规',
  erotic: '色情',
  gambling: '赌博',
}

export const domainCateColor: Mappings<StatusColor> = {
  no: 'default',
  erotic: 'warning',
  gambling: 'error',
}

export const icpNames: Mappings = {
  domain: '域名',
  home_url: '网站首页',
  limit_access: '访问限制',
  main_licence: '主体备案',
  unit_type: '主办单位性质',
  service_licence: '网站备案',
  service_name: '备案名称',
  unit_name: '主办单位名称',
  update_record_time: '审核时间',
}

export const psnNames: Mappings = {
  domain: '域名',
  record_id: '公安备案号',
  record_bureau: '备案地公安',
  unit_type: '开办主体性质',
  unit_name: '开办主体名称',
  website_main_domain: '网站主域名',
  website_second_domain: '网站二级域名',
  website_name: '网站名称',
  website_type: '网站类别',
  record_time: '联网备案时间',
}

export const whoisNames: Mappings = {
  registrar: '注册服务机构',
  name: '机构名称',
  email: '联系邮箱',
  phone: '联系电话',
  whois_servers: '服务器',
  website: '网站首页',
  iana_id: 'IANA',
  registrant: '注册机构（者）',
  organization: '机构组织',
  country: '所在国家',
  province: '所在省份',
  city: '所在城市',
  street: '街道地址',
  postal_code: '邮编',
  fax: '传真',
  registry: '注册记录',
  creation_time: '注册时间',
  updated_time: '更新时间',
  expiration_time: '过期时间',
  domain_info: '基本信息',
  domain: '基本信息',
  name_servers: '名称服务器',
  dns_sec: '安全扩展',
  status: '状态',
}

export const domainWhoisStatus: Mappings = {
  addPeriod: '注册局设置域名新注册期',
  ok: '正常状态',
  clientDeleteProhibited: '注册商设置禁止删除',
  serverDeleteProhibited: '注册局设置禁止删除',
  clientUpdateProhibited: '注册商设置禁止更新',
  serverUpdateProhibited: '注册局设置禁止更新',
  clientTransferProhibited: '注册商设置禁止转移',
  serverTransferProhibited: '注册局设置禁止转移',
  pendingVerification: '注册信息审核期',
  clientHold: '注册商设置暂停解析',
  serverHold: '注册局设置暂停解析',
  inactive: '非激活状态',
  clientRenewProhibited: '注册商设置禁止续费',
  serverRenewProhibited: '注册局设置禁止续费',
  pendingTransfer: '注册局设置转移过程中',
  redemptionPeriod: '注册局设置赎回期',
  pendingDelete: '注册局设置待删除/赎回期',
}

export const webNames: Mappings = {
  server: '服务器',
  status_code: '状态码',
  title: '标题',
  description: '描述',
  keywords: '关键字',
  url: '链接',
  cert: '证书',
  frame_url: '网站链接',
  icp: 'ICP 备案',
  psr: '公安备案',
}

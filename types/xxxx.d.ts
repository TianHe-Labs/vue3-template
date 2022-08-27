// status colors
declare type StatusColor =
  | 'default'
  | 'error'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | undefined

// Radio
interface RadioOption {
  label: string
  value: string
}

// stats
interface DomainStats {
  expiring: number
  expired: number
  occupied: number
  illegal_type: number
}

// domain
/**
 * 域名 ICP 备案
 */
interface DomainICP {
  home_url?: string
  limit_access?: string
  main_licence?: string
  unit_type: string
  service_licence: string
  service_name?: string
  unit_name: string
  update_record_time?: string
}

/**
 * 域名 Whois
 */
// 域名注册 服务机构
interface DomainRegistrar {
  name?: string
  email?: string
  phone?: string
  whois_servers?: string[]
  website?: string
}

// 域名注册 机构
interface DomainRegistrant {
  name?: string
  organization?: string
  country?: string
  province?: string
  city?: string
  street?: string
  phone?: string
  email?: string
}

// 域名注册 记录
interface DomainRegistry {
  creation_time?: string
  updated_time?: string
  expiration_time?: string
}

// 域名信息
interface DomainInfo {
  name?: string
  name_servers?: string[]
  dns_sec?: string
  status?: string[]
}

interface DomainWhois {
  registrar?: DomainRegistrar
  registrant?: DomainRegistrant
  registry?: DomainRegistry
  domain_info?: DomainInfo
  domain?: DomainInfo
  // administrator?: unknown // DomainAdministrator;
  // technician?: unknown // DomainTechnician;
  // billing?: unknown
}

/**
 * 域名网页快照
 */
// 元信息
interface SnapshotMeta {
  snapshot_version: string
  location: string
  classifier_version: string
}

interface Request {
  domain: string
  main_domain: string
  scheme: string
  request_url: string
}

interface ResFavicon {
  img_url: string
  md5: string
}

//网页结构
interface ResFrame {
  keywords: string[]
  html_url: string
  icp: string
  child_frames: ResFrame[] // child frames
  description: string[]
  text_content_url: string
  title: string
  frame_url: string
}

interface Response {
  favicon: ResFavicon
  remote_address: { ip: string }
  snapshot_url: string
  external_urls: string[]
  frame: ResFrame
  response_url: string
}

//  分类
interface Classification {
  probability: number
  type: string
}

interface DomainSnapshot {
  meta: SnapshotMeta
  request: Request
  response: Response
  classification: Classification
}

interface CollectedMeta {
  collected_timestamp: string
}

interface Domain {
  domain: string
  domain_status: string
  icp: DomainICP
  whois: DomainWhois
  snapshot: DomainSnapshot & CollectedMeta
  associated_chinese: string[]
  create_timestamp: string
  update_timestamp: string
}

import { dnsLinkLabelDecoder, isInlinedDnsLink } from './dns-link-labels.js'
import { subdomainRegex } from './regex.js'

export interface UrlParts {
  id: string | null
  protocol: string | null
  parentDomain: string
}

export function getSubdomainParts (urlString: string): UrlParts {
  const subdomainMatch = location.host.match(subdomainRegex)
  let id = subdomainMatch?.groups?.cidOrPeerIdOrDnslink || null
  let parentDomain = subdomainMatch?.groups?.parentDomain || ''
  const protocol = 'ipns'

  /*
  const labels = new URL(urlString).hostname.split('.')
  let id: string | null = null
  let protocol: string | null = null
  let parentDomain: string = urlString

  // DNS label inspection happens from from right to left
  // to work fine with edge cases like docs.ipfs.tech.ipns.foo.localhost

  for (let i = labels.length - 1; i >= 0; i--) {
    if (labels[i].startsWith('ipfs') || labels[i].startsWith('ipns')) {
      protocol = labels[i]
      id = labels.slice(0, i).join('.')
      parentDomain = labels.slice(i + 1).join('.')
      if (protocol === 'ipns' && isInlinedDnsLink(id)) {
        // un-inline DNSLink names according to https://specs.ipfs.tech/http-gateways/subdomain-gateway/#host-request-header
        id = dnsLinkLabelDecoder(id)
      }
      break
    }
  }
  */
  if (id) {
    id = dnsLinkLabelDecoder(id)
    id += '.seahex.org'
  }
   parentDomain = parentDomain.replace(/:.*$/,'')

  // console.log("Jim GetSubdomainParts", id, parentDomain, protocol)
  return {
    id,
    parentDomain,
    protocol
  }
}

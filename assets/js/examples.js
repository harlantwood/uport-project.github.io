(function() {
var Uport = uportlib.Uport

var uport = new Uport('uPortDeveloper')
var web3 = uport.getWeb3()
// work around due to web3 requiring  a from address
web3.eth.defaultAccount = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'

var statusAbi = [{'constant': false, 'inputs': [{'name': 'status', 'type': 'string'}], 'name': 'updateStatus', 'outputs': [], 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'addr', 'type': 'address'}], 'name': 'getStatus', 'outputs': [{'name': '', 'type': 'string'}], 'type': 'function'}]
var statusContract = web3.eth.contract(statusAbi)
var status = statusContract.at('0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087')

window.uport = uport;
window.web3 = web3;
window.statusFunction = status;

$('#askForUport').click(function (e) {
  e.stopPropagation()
  uport.getUserPersona()
     .then((persona) => {
       console.log(persona.profileAddress)
       var profile = persona.profile
       console.log(profile)
       if (profile.image) {
         $('#uport-image').attr('src','https://ipfs.infura.io'+profile.image.contentUrl)
       }
       $('#uport-name').text(profile.name)
       $('#uport-profile-address').text(persona.profileAddress)
       $('#uport-profile-address').attr('href','https://ropsten.io/address/' + persona.profileAddress)
       $('#uport-log').text(JSON.stringify(profile)).show()
      window.Intercom('boot', {
        app_id: 'g16ho63p',
        name: profile.name,
        created_at: 1234567890,
      });
      Intercom('trackEvent', 'connect-demo')
     })
  return false
})

$('#getAccountsButton').click(function (e) {
  e.stopPropagation()
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error)
      return
    }
    $('#uport-address').text(accounts[0])
    $('#uport-address').attr('href', 'https://ropsten.io/address/' + accounts[0])
    $('#uport-log-web3').text(JSON.stringify(accounts)).show()

    Intercom('trackEvent', 'web3-getaccounts-demo')
  })
  return false
})


$('#setStatus').click(function (e) {
  console.log('called setStatus')
  e.stopPropagation()
  var text = $('#uport-status-text').val()
  status.updateStatus(text, function(error, txhash) {
    if (error) {
      console.log(error)
      return
    }
    $('#uport-status-txhash').text(txhash)
    $('#uport-status-txhash').attr('href','https://ropsten.io/tx/' + txhash)

    $('#uport-log-web3').text(txhash).show()

    Intercom('trackEvent', 'web3-status-demo')
  })
  return false
})

})()
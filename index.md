---
layout: default
hero:  true
title: Uport for Developers
---

## Try now

To do try the following you will need to have the uPort mobile app installed.

### Connect with uPort

One of the most basic things you should do is allow your user to connect their uPort to your app.

{% include examples/connect.html %}


### Write user friendly Ethereum dApps

If you're writing dApps for Ethereum, you are probably using web3. Uport allows you write your Ethereum apps like normal yet allow your users to not worry about getting Ethereum setup on their computer. The uPort app manages that for you.

In the following example the Status smart contract is called setting your status:

{% include examples/call-function.html %}

In most cases the web3 object acts like you would expect, but if you need your users address for example you can just call `web3.eth.getAccounts()` and we ask the app.

{% include examples/web3.html %}

## Learn more

To go into more details of how uport lib works try our [tutoral showing you how to create a simple wallet using uPort](/tutorial.html).
# uPort :: Off-Chain Attestations

## Use case

These kinds of attestations are for non-blockchain usecases. For instance:

* Logging in to a web service
* Submitting a portable KYC token
* Providing a certificate of completed education

We want a very simple and flexible format that can accommodate current and future use cases. We use the JWT format for now since this is well supported. We may also want to support JSON-LD signatures in the future if this becomes popular.

## Adding Attestations

A service can create attestations, provide them to the user as well as request attestations using the [uport-js](https://github.com/uport-project/uport-js) library.

## Format of Attestations

The following is the format of the “payload” part of the JWT:

```
{
    iss: <uPortId of issuer>,
    sub: <uPortId of subject>,
    iat: 1479850830 <Timestamp when attestation was created>,
    exp: 1511305200 <expiry of attestation>,
    claim: {
        <claim type, example: "name">:<claim value, example: "Andres">
    }
}
```

In order to simplify the presentation we could initially limit the `value` part to a single value. This way it could be easily viewed in a list view. However we need support for  the value being a complete JSON object as well, for instance for an educational degree. The “header” part of the JWT should be a standard JWT header, reflecting the type of key it was signed with. 

In order to make the attestations as flexible as possible we are not at this time specifying any particular format of claims. However we may want to require http://schema.org or similar schema in the future.


## Displaying an attestation

If the claim in the attestation is a simple object of the form `{"key" : "value"}`, then the display of the attestation can have `key` as a title and `value` as the field value. This will be the types of claims we will start with. For more complex attestations it is recommended to still have one `type` field and let the `value` field consist of a JSON object. In this case the title of the displayed attestation would still be the `type` field, and the body of the displayed attestation can be a list view of the keys and values of the JSON object.



## Storing Attestations

The tokens will be stored locally on the iOS/Android device. Ideally we can use iCloud (CloudKit?) to sync/backup the attestations so that they can be recovered if the user lose their phone.
By default the attestations will be backed up if the user has iCloud backups turned on.

For Android we need to look into integration with Google Drive and/or Dropbox. For now we can just store locally on the phone and have 


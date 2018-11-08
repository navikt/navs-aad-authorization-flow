# NAV's AAD authorization flow Example APP
#### Authorize access to Azure Active Directory web applications using OAuth 2.0 code grant flow.

### Token examples


## Service-to-service accessToken
```
{
  "aud": "e7aada64-06d1-4148-95c9-a1fcceef44",
  "iss": "https://sts.windows.net/62366534-1ec3-4962-8869-9b5574279d0b/",
  "iat": 1541663530,
  "nbf": 1541663530,
  "exp": 1541667430,
  "aio": "42RgYHjTtN2gchWNGCa58arkW/BAA=",
  "appid": "e7aada64-06d1-4148-95c9-a1fccdeef44",
  "appidacr": "1",
  "idp": "https://sts.windows.net/62366534-1ec3-4962-8869-9b5574279d0b/",
  "oid": "e25b5525-5532-491a-b275-5d3a6e8f16c9",
  "sub": "e25b5525-5532-491a-b275-5d3a6e8f16c9",
  "tid": "62366534-1ec3-4962-8869-9b5574279d0b",
  "uti": "RUHb-5hfGgjPAhD_oLAA",
  "ver": "1.0"
}
```

## accessToken generated with users refreshToken
```
{
  "aud": "e7aada64-06d1-4148-95c9-a1fccdeef44",
  "iss": "https://sts.windows.net/62366534-1ec3-4962-8869-9b5574279d0b/",
  "iat": 1541663602,
  "nbf": 1541663602,
  "exp": 1541667502,
  "acr": "1",
  "aio": "AUQAu/8JAAAAbHZsBaxqmhUmbXU2dYoRsFTXzgrLffr7NSnEsm/AclTc0NGK/fG5hyRU+k9c+SpkCDPrUbUVpw==",
  "amr": [
    "rsa",
    "mfa"
  ],
  "appid": "e7aada64-06d1-4148-95c9-a1fccdeef44",
  "appidacr": "1",
  "deviceid": "b1ef6716-e59e-4335-80a0-90c1f8143437",
  "family_name": "Nordlund",
  "given_name": "Kjetil",
  "groups": [
    "b516a12f-2274-471a-a3d1-674aa201a9e",
    "e4b4e1e3-8c1c-4faa-9f49-50395723603",
    "4f8a04f1-4975-45b1-831c-7dedac3aab3",
    "59007308-a1ef-47e7-8e3d-e07e5d29f82",
    "af129fd3-0d95-41a6-adc5-d3a5a6c9ed6",
    "53cbf709-a2d8-43d3-8f72-acd7377d691",
    "f77f60da-2d24-4492-a217-19306136074",
  ],
  "ipaddr": "84.219.191.155",
  "name": "Nordlund, Kjetil",
  "oid": "1190164d-e996-458c-b724-381409b67e3d",
  "onprem_sid": "S-1-5-43-2336994272-1756841686-4116994434-27596",
  "scp": "User.Read",
  "sub": "Lz7FYjxPw-6O1jh71hHDSjkCN5MBx-IPhNSiXDRdE",
  "tid": "62366534-1ec3-4782-8869-9b5674279d0b",
  "unique_name": "Kjetil.Nordlund@nav.no",
  "upn": "Kjetil.Nordlund@nav.no",
  "uti": "BD00jJ7NnlYrRaDHwOAA",
  "ver": "1.0"
}
```

## accessToken generated with users existing accessToken (on-behalf-of flow)
```
{
  "aud": "e7aada64-06d1-4148-95c9-a1fccdeef44",
  "iss": "https://sts.windows.net/62366534-1ec3-4962-8869-9b5574279d0b/",
  "iat": 1541663707,
  "nbf": 1541663707,
  "exp": 1541667467,
  "acr": "1",
  "aio": "AUQAu/8JAAAAP2DRl7GTERzvvlJQk6Oe2VlgVee6ZJn62P6nhpnjV3A9RK91XEVe0fEDgdQ+mkAXjCA==",
  "amr": [
    "rsa",
    "mfa"
  ],
  "appid": "e7aada64-06d1-4148-95c9-a1fccdeef44",
  "appidacr": "1",
  "deviceid": "b1ef6716-e59e-4335-80a0-90c1f8143437",
  "family_name": "Nordlund",
  "given_name": "Kjetil",
  "groups": [
    "b516a12f-2274-471a-a3d1-674aa201a9e",
    "e4b4e1e3-8c1c-4faa-9f49-50395723603",
    "4f8a04f1-4975-45b1-831c-7dedac3aab3",
    "59007308-a1ef-47e7-8e3d-e07e5d29f82",
    "af129fd3-0d95-41a6-adc5-d3a5a6c9ed6",
    "53cbf709-a2d8-43d3-8f72-acd7377d691",
    "f77f60da-2d24-4492-a217-19306136074",
  ],
  "ipaddr": "84.219.191.155",
  "name": "Nordlund, Kjetil",
  "oid": "1190164d-e996-488c-b724-381409b67e3d",
  "onprem_sid": "S-1-5-43-2336994272-1756841686-4116994434-27596",
  "scp": "User.Read",
  "sub": "Lz7FYjxPw-6O1jh71hHDSjkCN5MBx-IPhNSiXDRdE",
  "tid": "62366534-1ec3-4962-8869-9b5574279d0b",
  "unique_name": "Kjetil.Nordlund@nav.no",
  "upn": "Kjetil.Nordlund@nav.no",
  "uti": "2XEG--7AVkuD8BGqlfoNAA",
  "ver": "1.0"
}
```
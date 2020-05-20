import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/YpiEXoUu08Me2FiUtN46ziil\n' +
    'P2QDAeLvtEdRELpOpJQasRVTAZr24oaun8ue7qwf5L5wsZSqjhlu7oJqf7kzbMXa\n' +
    'fIKbDDzVuecLhvoCFD3GAegdc5hibNiVmKA6XyJXH6CDi2RXoTrNx4PWNNBINNMV\n' +
    'o5QVSxHgMYAzM/i6cQIDAQAB';

// 加密
export const encrypt = txt => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
};

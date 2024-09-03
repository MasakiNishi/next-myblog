import axios from "axios";
import { WpGraphQlAuthConst } from "../constants/WpGraphQlConst";

let authToken: string | null = null;
let refreshToken: string | null = null;
let tokenExpirationTime: number | null = null;

const repository = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWTトークンを取得するための関数
const getJwtToken = async () => {
  const response = await repository.post("/", {
    query: WpGraphQlAuthConst.loginUser,
  });

  const { authToken: newAuthToken, refreshToken: newRefreshToken } =
    response.data.data.login;

  authToken = newAuthToken;
  refreshToken = newRefreshToken;

  // 現在の時刻を取得して、有効期限を55秒後に設定（+5秒のバッファ）
  tokenExpirationTime = Date.now() + 55 * 1000;

  return { authToken, refreshToken };
};

// JWTトークンをリフレッシュするための関数
const refreshJwtToken = async () => {
  const response = await repository.post("/", {
    query: WpGraphQlAuthConst.refreshTokenQuery(refreshToken as string),
  });

  const { authToken: newAuthToken } = response.data.data.refreshJwtAuthToken;

  if (!newAuthToken || response.data.errors) {
    // refreshTokenが期限切れの場合、トークンを再取得
    await getJwtToken();
  } else {
    authToken = newAuthToken;

    // 有効期限を55秒後に再設定（+5秒のバッファ）
    tokenExpirationTime = Date.now() + 55 * 1000;
  }

  return authToken;
};

// トークンが期限切れかどうかをチェックする関数
const isTokenExpired = () => {
  return tokenExpirationTime !== null && Date.now() >= tokenExpirationTime;
};

const Repository = async (
  query: string,
  { variables }: Record<string, any> = {}
) => {
  // トークンがない場合、またはトークンが期限切れの場合、トークンを取得または更新
  if (!authToken) {
    await getJwtToken();
  } else if (authToken && refreshToken && isTokenExpired()) {
    await refreshJwtToken();
  }

  const body = {
    query,
    variables,
  };

  // リクエスト実行関数
  const executeRequest = async () => {
    const response = await repository.post("/", body, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  };

  return {
    getWp: executeRequest,
  };
};

export default Repository;

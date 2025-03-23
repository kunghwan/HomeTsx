import {
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";

interface DataItem {
  id: string;
  name: string;
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<DataItem[]>([]); // 데이터를 저장할 상태 변수
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  // useCallback을 사용하여 fetchData 함수 메모이제이션
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // 데이터를 가져오기 시작하므로 로딩을 true로 설정
      const querySnapshot = await getDocs(collection(db, "yourCollection"));
      const fetchedData: DataItem[] = [];

      // Firestore에서 데이터를 순회하면서 배열에 저장
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, name: doc.data().name });
      });

      // 데이터를 상태에 저장
      setData(fetchedData);
    } catch (err: any) {
      // 에러가 발생하면 에러 메시지 설정
      setError("Error fetching data");
    } finally {
      // 데이터 가져오기가 끝났으므로 로딩 상태를 false로 변경
      setLoading(false);
    }
  }, []); // 빈 배열을 의존성 배열로 전달하여, 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // useEffect에서 fetchData 함수 호출
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData 함수가 변경되지 않도록 최적화

  // `data` 배열은 메모이제이션하여 불필요한 리렌더링 방지
  const renderedData = useMemo(() => {
    return data.map((item) => <li key={item.id}>{item.name}</li>);
  }, [data]); // `data`가 변경될 때만 새로 계산

  // 로딩 상태일 때
  if (loading) {
    return <Loading />;
  }

  // 에러 상태일 때
  if (error) {
    return <div>{error}</div>;
  }

  // 데이터가 정상적으로 로드되었을 때
  return (
    <div>
      <ul>{renderedData}</ul>
      {children}
    </div>
  );
};

export default AuthProvider;

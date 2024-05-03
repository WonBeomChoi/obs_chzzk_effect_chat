import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useConfigValues } from '../context/config';
import { updateConfig } from '../utils/storage';

function Admin() {
  const {
    states: { effectInfos },
    setStates: { effectInfos: setEffectInfos },
  } = useConfigValues();

  const [editId, setEditId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const EFFECTS = useMemo(() => Object.values(effectInfos), [effectInfos]);

  const handleDelete = (id: string) => {
    const newEffectInfos = { ...effectInfos };
    delete newEffectInfos[id];
    setEffectInfos(newEffectInfos);
    updateConfig({
      effectInfos: newEffectInfos,
    });
  };

  const handleSetEditId = (id: string) => {
    setEditId(id);
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'white', height: '100vh' }}>
      <TempForm editId={editId} setEditId={setEditId} />
      <section>
        {EFFECTS.map(({ id, effectUrl, eventName, keywords, runningTime }) => (
          <div key={id} style={{ display: 'flex' }}>
            <img src={effectUrl} alt="" style={{ width: '200px' }} />
            <div>
              <p>event name : {eventName}</p>
              <p>keywords : {keywords.join(',')}</p>
              <p>running time : {runningTime / 1000}초</p>
              <button onClick={() => handleSetEditId(id)}>edit</button>
              <button onClick={() => handleDelete(id)}>delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

const TempForm = (props: { editId: string; setEditId: Dispatch<SetStateAction<string>> }) => {
  const {
    states: { effectInfos },
    setStates: { effectInfos: setEffectInfos },
  } = useConfigValues();

  const { editId, setEditId } = props;

  const [eventName, setEventName] = useState('');
  const [keywords, setKeyword] = useState('');
  const [effectUrl, seteffectUrl] = useState('');
  const [runningTime, setRunningTime] = useState('');

  const invalidateInput =
    keywords.trim().length === 0 ||
    eventName.trim().length === 0 ||
    effectUrl.trim().length === 0 ||
    runningTime.trim().length === 0 ||
    isNaN(Number(runningTime));

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (invalidateInput) {
      return;
    }

    const id = editId || String(Date.now());

    const newEffectInfo = {
      id,
      eventName,
      keywords: keywords.split(','),
      effectUrl,
      runningTime: Number(runningTime) * 1000,
    };

    const newEffectInfos = {
      ...effectInfos,
      [id]: newEffectInfo,
    };

    setEffectInfos(newEffectInfos);
    updateConfig({
      effectInfos: newEffectInfos,
    });

    setEventName('');
    setKeyword('');
    seteffectUrl('');
    setRunningTime('');
    setEditId('');
  };

  useEffect(() => {
    if (editId.length !== 0) {
      const { eventName, keywords, effectUrl, runningTime } = effectInfos[editId];
      setEventName(eventName);
      setKeyword(keywords.join(','));
      seteffectUrl(effectUrl);
      setRunningTime(String(runningTime / 1000));
    }
  }, [editId]);

  return (
    <form style={{ width: '500px' }} onSubmit={handleSubmit}>
      <Input
        placeholder="이벤트 이름"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <Input
        placeholder="키워드(쉼표로 구분)"
        value={keywords}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Input
        placeholder="이미지 주소"
        value={effectUrl}
        onChange={(e) => seteffectUrl(e.target.value)}
      />
      <Input
        placeholder="실행 시간 (초)"
        value={runningTime}
        onChange={(e) => setRunningTime(e.target.value)}
      />
      <button type="submit" disabled={invalidateInput}>
        제출
      </button>
    </form>
  );
};

const Input = styled.input.attrs({ type: 'text', autoComplete: 'off' })`
  display: block;
`;

export default Admin;

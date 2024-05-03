import React, { FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useConfigValues } from '../context/config';
import { updateConfig } from '../utils/storage';

function Admin() {
  const {
    states: { effectInfos },
    setStates: { effectInfos: setEffectInfos },
  } = useConfigValues();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const idRef = useRef('');
  const [eventName, setEventName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');
  const [runningTime, setRunningTime] = useState('');

  const EFFECTS = useMemo(() => Object.values(effectInfos), [effectInfos]);

  const invalidateInput =
    keyword.trim().length === 0 ||
    eventName.trim().length === 0 ||
    url.trim().length === 0 ||
    runningTime.trim().length === 0 ||
    isNaN(Number(runningTime));

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (invalidateInput) {
      return;
    }

    const id = idRef.current || String(Date.now());

    const newEffectInfo = {
      id,
      eventName,
      keywords: keyword.split(','),
      url,
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
    setUrl('');
    setRunningTime('');
    idRef.current = '';
  };

  const handleDelete = (id: string) => {
    const newEffectInfos = { ...effectInfos };
    delete newEffectInfos[id];
    setEffectInfos(newEffectInfos);
    updateConfig({
      effectInfos: newEffectInfos,
    });
  };

  const handleEdit = (id: string) => {
    const { eventName, keywords, url, runningTime } = effectInfos[id];
    idRef.current = id;
    setEventName(eventName);
    setKeyword(keywords.join(','));
    setUrl(url);
    setRunningTime(String(runningTime / 1000));
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <form action="" method="post" onSubmit={handleSubmit}>
        <Input
          name="eventName"
          type="text"
          placeholder="이벤트 이름"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          autoComplete="off"
        />
        <Input
          name="keyword"
          type="text"
          placeholder="키워드(쉼표로 구분)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
        <Input
          name="url"
          type="text"
          placeholder="이미지 주소"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoComplete="off"
        />
        <Input
          name="url"
          type="text"
          placeholder="실행 시간 (초)"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" disabled={invalidateInput}>
          제출
        </button>
      </form>
      <section>
        {EFFECTS.map((effect) => (
          <div key={effect.id} style={{ display: 'flex' }}>
            <img src={effect.url} alt="" style={{ width: '200px' }} />
            <div>
              <p>event name : {effect.eventName}</p>
              <p>keywords : {effect.keywords.join(',')}</p>
              <p>running time : {effect.runningTime / 1000}초</p>
              <button onClick={() => handleEdit(effect.id)}>edit</button>
              <button onClick={() => handleDelete(effect.id)}>delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

const Input = styled.input`
  display: block;
`;

export default Admin;

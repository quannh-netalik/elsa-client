/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { ESocketEvent, IQuizSession } from "../../type";
import { useAppContext } from "../../context/AppContext";

enum EQuizSessionOption {
  New = "new",
  Join = "join",
}

const options = [
  { label: "Create new session", value: EQuizSessionOption.New },
  { label: "Join Session", value: EQuizSessionOption.Join },
];

const QuizSession: FC = () => {
  const [session, setSession] = useState<IQuizSession>();
  const { token } = useAppContext();
  const [quizSessionType, setQuizSessionType] = useState<EQuizSessionOption>();
  const [joinSessionId, setJoinSessionId] = useState<string>();
  const [err, setErr] = useState<string>();

  useEffect(() => {
    return () => {
      setErr(undefined);
    };
  }, [session]);

  socket.on(ESocketEvent.USER_JOINED, ({ session }) => {
    setSession(session);
  });

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      setQuizSessionType(e.target.value);

      // Create new Session
      if (e.target.value === EQuizSessionOption.New) {
        socket.emit(
          ESocketEvent.CREATE_QUIZ_SESSION,
          { token },
          (response: any) => {
            if (response.success && response.session) {
              setSession(response.session);
            }
          }
        );
      }
    },
    [token]
  );

  return (
    <>
      {!session ? (
        <>
          <Radio.Group
            onChange={handleChange}
            value={quizSessionType}
            options={options}
            defaultValue="Apple"
            optionType="button"
            buttonStyle="solid"
            size="large"
          />
          <br />
          {quizSessionType === EQuizSessionOption.Join && (
            <div>
              <Input
                value={joinSessionId}
                onChange={(e) => setJoinSessionId(e.target.value)}
                placeholder="SessionId"
                size="large"
                width={100}
              />
              {err && <div style={{ color: "red" }}>{err}</div>}
              <br />

              <Button
                type="primary"
                onClick={() => {
                  // Join new Session
                  socket.emit(
                    ESocketEvent.JOIN_QUIZ_SESSION,
                    { sessionId: joinSessionId, token },
                    (response: any) => {
                      if (response.success && response.session) {
                        setSession(response.session);
                      }

                      if (!response.success && response.error) {
                        console.log(response.error);
                        setErr(response.error);
                      }
                    }
                  );
                }}
              >
                Join
              </Button>
            </div>
          )}
        </>
      ) : (
        <div>
          <ul>
            <li>
              <b>SessionId:</b> {session.sessionId}
            </li>
            <li>
              <b>Session Status:</b> {session.status}
            </li>
            <li>
              <b>UserId:</b> [{session.userIds.join(", ")}]
            </li>
            <li>
              <b>Number of Question:</b> {session.numberOfQuestions}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default QuizSession;

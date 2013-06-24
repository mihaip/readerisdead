import logging
import threading
import Queue

def do_work(worker_creator, requests, parallelism, report_progress=None):
  request_queue = Queue.Queue()
  response_queue = Queue.Queue()
  for i in xrange(parallelism):
    thread = WorkerThread(request_queue, response_queue, worker_creator())
    thread.start()

  for request_index, request in enumerate(requests):
    request_queue.put((request, request_index))

  responses = [None] * len(requests)
  for i in xrange(len(requests)):
    response, request_index = response_queue.get()
    responses[request_index] = response
    response_queue.task_done()
    if report_progress:
      report_progress(requests[request_index], response)

  return responses

class Worker(object):
  def work(self, request):
    raise NotImplementedError()

class WorkerThread(threading.Thread):
  def __init__(self, request_queue, response_queue, worker):
    threading.Thread.__init__(self)
    self._request_queue = request_queue
    self._response_queue = response_queue
    self._worker = worker
    self.daemon = True

  def run(self):
    while True:
      request, request_index = self._request_queue.get()
      try:
        response = self._worker.work(request)
      except:
        logging.error('Exception when running worker', exc_info=True)
        response = None
      self._request_queue.task_done()
      self._response_queue.put((response, request_index))

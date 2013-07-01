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
    request_queue.put((request, request_index, False))

  responses = [None] * len(requests)
  for i in xrange(len(requests)):
    response, request_index = response_queue.get()
    responses[request_index] = response
    response_queue.task_done()
    if report_progress:
      report_progress(requests[request_index], response)

  for i in xrange(parallelism):
    request_queue.put((None, -1, True))

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
    self._stopped = False

  def run(self):
    while not self._stopped:
      self._service_request()

  def _service_request(self):
      request, request_index, should_stop = self._request_queue.get()
      if should_stop:
        self._stopped = True
        return
      try:
        response = self._worker.work(request)
      except:
        logging.error('Exception when running worker', exc_info=True)
        response = None
      self._request_queue.task_done()
      self._response_queue.put((response, request_index))
